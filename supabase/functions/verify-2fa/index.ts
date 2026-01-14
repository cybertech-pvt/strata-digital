import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// TOTP verification using HMAC-SHA1
async function verifyTOTP(secret: string, token: string): Promise<boolean> {
  const timeStep = 30;
  const digits = 6;
  
  // Check current and adjacent time windows for clock drift tolerance
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
  // Decode base32 secret
  const keyBytes = base32Decode(secret);
  
  // Convert counter to 8-byte buffer
  const counterBytes = new Uint8Array(8);
  let temp = counter;
  for (let i = 7; i >= 0; i--) {
    counterBytes[i] = temp & 0xff;
    temp = Math.floor(temp / 256);
  }
  
  // HMAC-SHA1
  const key = await crypto.subtle.importKey(
    'raw',
    keyBytes.buffer as ArrayBuffer,
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', key, counterBytes);
  const hash = new Uint8Array(signature);
  
  // Dynamic truncation
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
    const { code } = await req.json();

    if (!code || typeof code !== 'string' || code.length !== 6) {
      return new Response(
        JSON.stringify({ error: 'Invalid code format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get 2FA secret using service role for secure access
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data: twoFaData, error: twoFaError } = await supabaseAdmin
      .from('admin_2fa_secrets')
      .select('secret, is_enabled, backup_codes')
      .eq('user_id', userId)
      .single();

    if (twoFaError || !twoFaData) {
      console.error('2FA data not found:', twoFaError);
      return new Response(
        JSON.stringify({ error: '2FA not set up' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if it's a backup code
    const backupCodes: string[] = twoFaData.backup_codes || [];
    const backupCodeIndex = backupCodes.indexOf(code);
    
    if (backupCodeIndex !== -1) {
      // Valid backup code - remove it after use
      const updatedBackupCodes = backupCodes.filter((_: string, i: number) => i !== backupCodeIndex);
      await supabaseAdmin
        .from('admin_2fa_secrets')
        .update({ backup_codes: updatedBackupCodes })
        .eq('user_id', userId);
      
      console.log(`Backup code used for user ${userId}`);
      return new Response(
        JSON.stringify({ verified: true, usedBackupCode: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify TOTP code
    const isValid = await verifyTOTP(twoFaData.secret, code);

    if (!isValid) {
      console.log(`Invalid 2FA code for user ${userId}`);
      return new Response(
        JSON.stringify({ error: 'Invalid code' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`2FA verified successfully for user ${userId}`);
    return new Response(
      JSON.stringify({ verified: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in verify-2fa:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
