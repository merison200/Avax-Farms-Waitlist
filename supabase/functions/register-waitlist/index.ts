import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface RegisterPayload {
  email: string;
  name?: string;
  userAgent?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { email, name, userAgent }: RegisterPayload = await req.json();

    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ error: 'Valid email is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';

    let location = {};
    try {
      const geoResponse = await fetch(`https://ipapi.co/${clientIp}/json/`);
      if (geoResponse.ok) location = await geoResponse.json();
    } catch (e) {
      console.error('Geolocation lookup failed:', e);
    }

    // Check if email already exists
    const { data: existing } = await supabase
      .from('waitlist')
      .select('id')
      .ilike('email', email)
      .maybeSingle();

    if (existing) {
      return new Response(
        JSON.stringify({ error: "You're already on the waitlist" }),
        { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Insert new waitlist entry
    const { error: insertError } = await supabase.from('waitlist').insert({
      email: email.toLowerCase(),
      name,
      ip_address: clientIp,
      location,
      user_agent: userAgent || req.headers.get('user-agent') || 'unknown',
    });

    // Handle database duplicate error (race condition)
    if (insertError) {
      console.error('Insert error:', insertError);
      
      // Check if it's a duplicate key error (code 23505)
      if (insertError.code === '23505' || insertError.message?.includes('duplicate key')) {
        return new Response(
          JSON.stringify({ error: "You're already on the waitlist" }),
          { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      // For other errors, throw to be caught by outer catch
      throw insertError;
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Successfully joined the waitlist!' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Something went wrong. Please try again.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});