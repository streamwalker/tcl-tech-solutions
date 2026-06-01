import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const systemPrompt = `You are a helpful assistant for TCL Tech Solutions, a technology consulting company founded in 1998 with over 25 years of experience. 

About TCL Tech Solutions:
- Founded in 1998, based in Washington, DC
- Serves clients nationwide
- 500+ completed projects, 150+ happy clients
- 25+ years of experience
- 98% client satisfaction rate
- Available 24/7 support

Core Services:
- Cloud Computing (AWS, Azure, Google Cloud)
- Cybersecurity solutions
- Digital Transformation
- IT Infrastructure management
- Data Management & Analytics
- Business Intelligence

Expertise:
- AWS, Azure, and Google Cloud certified consultants
- Deep industry knowledge across multiple sectors
- Proven track record with enterprise clients

Contact Information:
- Phone: +1 (202) 555-0123
- Email: info@tcltechsolutions.com
- Address: 1150 Connecticut Ave NW, Washington, DC 20036
- Business Hours: Monday-Friday, 9 AM - 6 PM EST

Your role:
- Answer questions about TCL's services and capabilities
- Help visitors understand how TCL can solve their technology challenges
- Provide information about pricing and consultation options
- Encourage visitors to schedule consultations or request quotes
- Be professional, knowledgeable, and helpful
- If asked about specific technical implementations or detailed pricing, suggest scheduling a consultation
- Keep responses concise but informative

Always maintain a professional tone and focus on how TCL can help solve the visitor's technology challenges.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Verify authentication - validate the JWT, not just check header presence
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(
      JSON.stringify({ 
        error: 'Authentication required',
        response: "Please sign in to use the chat feature.",
        success: false 
      }),
      { 
        status: 401, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
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
      JSON.stringify({ 
        error: 'Invalid or expired token',
        response: "Please sign in to use the chat feature.",
        success: false 
      }),
      { 
        status: 401, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }

  try {
    const { message, conversationHistory = [] } = await req.json();

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Message is required', success: false }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const botResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ 
      response: botResponse,
      success: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-bot function:', error);
    return new Response(JSON.stringify({ 
      error: 'An error occurred',
      response: "I'm sorry, I'm having trouble responding right now. Please try again or contact us directly at +1 (202) 555-0123.",
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
