import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Generate a random base32 secret
function generateSecret(length: number = 20): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const randomBytes = crypto.getRandomValues(new Uint8Array(length));
  let secret = '';
  for (const byte of randomBytes) {
    secret += alphabet[byte % 32];
  }
  return secret;
}

// Generate backup codes
function generateBackupCodes(count: number = 8): string[] {
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    const randomBytes = crypto.getRandomValues(new Uint8Array(4));
    const code = Array.from(randomBytes)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase();
    codes.push(code);
  }
  return codes;
}

// TOTP verification using HMAC-SHA1
async function verifyTOTP(secret: string, token: string): Promise<boolean> {
  const timeStep = 30;
  const digits = 6;
  
  const currentTime = Math.floor(Date.now() / 1000);
  const timeWindows = [
    Math.floor(currentTime / timeStep) - 1,
    Math.floor(currentTime / timeStep),
    Math.floor(currentTime / timeStep) + 1,
  ];
  
  for (const counter of timeWindows) {
    const expectedToken = await generateTOTP(secret, counter, digits);
    if (expectedToken === token) {
      return true;
    }
  }
  
  return false;
}

async function generateTOTP(secret: string, counter: number, digits: number): Promise<string> {
  const keyBytes = base32Decode(secret);
  
  const counterBytes = new Uint8Array(8);
  let temp = counter;
  for (let i = 7; i >= 0; i--) {
    counterBytes[i] = temp & 0xff;
    temp = Math.floor(temp / 256);
  }
  
  const key = await crypto.subtle.importKey(
    'raw',
    keyBytes.buffer as ArrayBuffer,
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', key, counterBytes);
  const hash = new Uint8Array(signature);
  
  const offset = hash[hash.length - 1] & 0x0f;
  const binary = 
    ((hash[offset] & 0x7f) << 24) |
    ((hash[offset + 1] & 0xff) << 16) |
    ((hash[offset + 2] & 0xff) << 8) |
    (hash[offset + 3] & 0xff);
  
  const otp = binary % Math.pow(10, digits);
  return otp.toString().padStart(digits, '0');
}

function base32Decode(encoded: string): Uint8Array {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const cleanedInput = encoded.toUpperCase().replace(/=+$/, '');
  
  let bits = '';
  for (const char of cleanedInput) {
    const index = alphabet.indexOf(char);
    if (index === -1) continue;
    bits += index.toString(2).padStart(5, '0');
  }
  
  const bytes = new Uint8Array(Math.floor(bits.length / 8));
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(bits.slice(i * 8, (i + 1) * 8), 2);
  }
  
  return bytes;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userId = claimsData.claims.sub as string;
    const userEmail = claimsData.claims.email as string;

    // Verify admin role using service role
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data: roleData, error: roleError } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();

    if (roleError || !roleData) {
      return new Response(
        JSON.stringify({ error: 'Admin access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body = await req.json();
    const { action, code } = body;

    if (action === 'generate') {
      // Generate new 2FA secret
      const secret = generateSecret();
      const backupCodes = generateBackupCodes();
      
      // Create TOTP URI for authenticator apps
      const issuer = 'CyberVibe Admin';
      const otpAuthUrl = `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(userEmail)}?secret=${secret}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=6&period=30`;

      // Store secret (not enabled yet)
      const { error: upsertError } = await supabaseAdmin
        .from('admin_2fa_secrets')
        .upsert({
          user_id: userId,
          secret,
          backup_codes: backupCodes,
          is_enabled: false,
        }, { onConflict: 'user_id' });

      if (upsertError) {
        console.error('Error storing 2FA secret:', upsertError);
        return new Response(
          JSON.stringify({ error: 'Failed to set up 2FA' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log(`2FA setup initiated for user ${userId}`);
      return new Response(
        JSON.stringify({ 
          secret, 
          otpAuthUrl, 
          backupCodes 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'enable') {
      if (!code || typeof code !== 'string' || code.length !== 6) {
        return new Response(
          JSON.stringify({ error: 'Invalid code format' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get stored secret
      const { data: twoFaData, error: fetchError } = await supabaseAdmin
        .from('admin_2fa_secrets')
        .select('secret')
        .eq('user_id', userId)
        .single();

      if (fetchError || !twoFaData) {
        return new Response(
          JSON.stringify({ error: 'Please generate a secret first' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Verify the code locally
      const isValid = await verifyTOTP(twoFaData.secret, code);
      
      if (!isValid) {
        return new Response(
          JSON.stringify({ error: 'Invalid verification code' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Enable 2FA
      const { error: enableError } = await supabaseAdmin
        .from('admin_2fa_secrets')
        .update({ is_enabled: true })
        .eq('user_id', userId);

      if (enableError) {
        return new Response(
          JSON.stringify({ error: 'Failed to enable 2FA' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log(`2FA enabled for user ${userId}`);
      return new Response(
        JSON.stringify({ enabled: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'disable') {
      if (!code || typeof code !== 'string' || code.length !== 6) {
        return new Response(
          JSON.stringify({ error: 'Invalid code format' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get stored secret
      const { data: twoFaData, error: fetchError } = await supabaseAdmin
        .from('admin_2fa_secrets')
        .select('secret')
        .eq('user_id', userId)
        .single();

      if (fetchError || !twoFaData) {
        return new Response(
          JSON.stringify({ error: '2FA not set up' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Verify the code locally
      const isValid = await verifyTOTP(twoFaData.secret, code);
      
      if (!isValid) {
        return new Response(
          JSON.stringify({ error: 'Invalid verification code' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Delete 2FA settings
      const { error: deleteError } = await supabaseAdmin
        .from('admin_2fa_secrets')
        .delete()
        .eq('user_id', userId);

      if (deleteError) {
        return new Response(
          JSON.stringify({ error: 'Failed to disable 2FA' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log(`2FA disabled for user ${userId}`);
      return new Response(
        JSON.stringify({ disabled: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'status') {
      const { data: statusData } = await supabaseAdmin
        .from('admin_2fa_secrets')
        .select('is_enabled')
        .eq('user_id', userId)
        .maybeSingle();

      return new Response(
        JSON.stringify({ 
          enabled: statusData?.is_enabled || false,
          configured: !!statusData
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in setup-2fa:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
