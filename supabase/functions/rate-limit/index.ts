import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limit configuration per form type
const RATE_LIMITS: Record<string, { maxRequests: number; windowSeconds: number }> = {
  contact: { maxRequests: 3, windowSeconds: 300 },      // 3 requests per 5 minutes
  newsletter: { maxRequests: 2, windowSeconds: 3600 },  // 2 requests per hour
  job_application: { maxRequests: 5, windowSeconds: 3600 }, // 5 applications per hour
};

// In-memory rate limit store (resets on function cold start)
// For production, consider using Redis or a database table
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIdentifier(req: Request): string {
  // Use X-Forwarded-For header (set by reverse proxy) or fall back to a hash of headers
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  // Fallback: create identifier from available headers
  const userAgent = req.headers.get('user-agent') || '';
  const acceptLanguage = req.headers.get('accept-language') || '';
  return `${userAgent}-${acceptLanguage}`.slice(0, 100);
}

function checkRateLimit(identifier: string, formType: string): { allowed: boolean; retryAfter?: number } {
  const config = RATE_LIMITS[formType];
  if (!config) {
    console.warn(`Unknown form type: ${formType}, allowing request`);
    return { allowed: true };
  }

  const key = `${formType}:${identifier}`;
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  // Clean up expired entries periodically
  if (rateLimitStore.size > 10000) {
    for (const [k, v] of rateLimitStore.entries()) {
      if (v.resetAt < now) {
        rateLimitStore.delete(k);
      }
    }
  }

  if (!entry || entry.resetAt < now) {
    // First request or window expired - create new entry
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + (config.windowSeconds * 1000),
    });
    return { allowed: true };
  }

  if (entry.count >= config.maxRequests) {
    // Rate limit exceeded
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    console.log(`Rate limit exceeded for ${key}. Retry after ${retryAfter}s`);
    return { allowed: false, retryAfter };
  }

  // Increment count
  entry.count++;
  rateLimitStore.set(key, entry);
  return { allowed: true };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { formType, email } = await req.json();

    if (!formType || !RATE_LIMITS[formType]) {
      console.error(`Invalid form type: ${formType}`);
      return new Response(
        JSON.stringify({ error: 'Invalid form type' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get client identifier (IP or fingerprint)
    const clientId = getClientIdentifier(req);
    
    // Also rate limit by email if provided (prevents email enumeration)
    const emailId = email ? `email:${email.toLowerCase().trim()}` : null;

    // Check rate limit by IP/client
    const clientCheck = checkRateLimit(clientId, formType);
    if (!clientCheck.allowed) {
      console.log(`Rate limited by client ID: ${clientId} for ${formType}`);
      return new Response(
        JSON.stringify({ 
          error: 'Too many requests. Please try again later.',
          retryAfter: clientCheck.retryAfter 
        }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'Retry-After': String(clientCheck.retryAfter)
          } 
        }
      );
    }

    // Check rate limit by email if provided
    if (emailId) {
      const emailCheck = checkRateLimit(emailId, formType);
      if (!emailCheck.allowed) {
        console.log(`Rate limited by email: ${email} for ${formType}`);
        return new Response(
          JSON.stringify({ 
            error: 'Too many requests from this email. Please try again later.',
            retryAfter: emailCheck.retryAfter 
          }),
          { 
            status: 429, 
            headers: { 
              ...corsHeaders, 
              'Content-Type': 'application/json',
              'Retry-After': String(emailCheck.retryAfter)
            } 
          }
        );
      }
    }

    console.log(`Rate limit check passed for ${formType} from ${clientId}`);
    
    return new Response(
      JSON.stringify({ allowed: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in rate-limit function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
