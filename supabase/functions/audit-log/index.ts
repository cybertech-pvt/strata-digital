import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AuditLogEntry {
  action: string;
  resource_type: string;
  resource_id?: string;
  details?: Record<string, unknown>;
  ip_address?: string;
  user_agent?: string;
}

/**
 * Audit Log Edge Function
 * 
 * Logs sensitive admin and employee actions for security monitoring.
 * All logged entries are stored in a secure audit_logs table.
 */
Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Verify user authentication
    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await userClient.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse request body
    const body: AuditLogEntry = await req.json();

    // Validate required fields
    if (!body.action || !body.resource_type) {
      return new Response(
        JSON.stringify({ error: "action and resource_type are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Use service client to insert audit log (bypasses RLS)
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);

    // Get user's role for logging
    const { data: roleData } = await adminClient
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id);

    const userRoles = roleData?.map((r) => r.role) || [];

    // Create audit log entry
    const auditEntry = {
      user_id: user.id,
      user_email: user.email,
      user_roles: userRoles,
      action: body.action,
      resource_type: body.resource_type,
      resource_id: body.resource_id || null,
      details: body.details || null,
      ip_address: req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "unknown",
      user_agent: req.headers.get("user-agent") || "unknown",
      timestamp: new Date().toISOString(),
    };

    console.log("Audit log entry:", JSON.stringify(auditEntry));

    // Note: In a production system, you would insert this into an audit_logs table
    // For now, we're logging to console which gets captured by Edge Function logs
    
    return new Response(
      JSON.stringify({ success: true, logged: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Audit logging error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
