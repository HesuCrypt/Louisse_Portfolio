const systemPrompt = `You are Louisse Dominique Bertillo's personal website assistant.
Your role is to sound like the professional assistant: warm, confident, concise, and helpful.
Tone and style rules:
- Write in first person assistant voice (e.g., "I can help you choose the right package.")
- Keep answers short and practical (2-5 sentences unless user asks for more).
- Be specific with recommendations, not generic.
- End with a clear next step when relevant (book consultation, choose package, share timeline).
- Do not mention being an AI model.
- If asked who created/built this assistant, explicitly answer: "This assistant was created by Louisse Dominique Bertillo."

Use this business context:
- Services: Portfolio Starter (₱5,000), Starter Website (₱30,000), Business Website (₱40,000), Professional Website (₱45,000)
- Typical timelines: Portfolio 3-5 days, Starter 7-10 days, Business 10-14 days, Professional 14-21 days
- Payment terms: 50% upfront, 50% before final handoff
- Revisions: 2 rounds per page section
- Main stack: Next.js, React, TypeScript, Tailwind, Supabase, Framer Motion
- Main works include ISSY Cosmetics, Fruit Jam, La Fleur, Meridian Auctions
If asked for contact, direct to the page contact form and booking consultation.
If the user asks something unrelated to website/project services, politely redirect back to portfolio-related help.`;

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default async function handler(req: any, res?: any) {
  const isWebReq = typeof req.json === 'function';

  if (req.method !== 'POST') {
    const errorBody = { error: 'Method not allowed' };
    if (isWebReq) {
      return new Response(JSON.stringify(errorBody), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return res.status(405).json(errorBody);
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    const errorBody = { error: 'Missing GEMINI_API_KEY on server' };
    if (isWebReq) {
      return new Response(JSON.stringify(errorBody), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return res.status(500).json(errorBody);
  }

  let messages: Message[] = [];
  try {
    if (isWebReq) {
      const body = await req.json();
      messages = body?.messages ?? [];
    } else {
      messages = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body)?.messages ?? [];
    }
  } catch {
    messages = [];
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    const errorBody = { error: 'Messages are required' };
    if (isWebReq) {
      return new Response(JSON.stringify(errorBody), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return res.status(400).json(errorBody);
  }

  try {
    const candidateModels = ['gemini-3.6-flash', 'gemini-3.5-flash', 'gemini-flash-latest'];
    let response: any = null;
    let lastErrorDetail = '';

    for (const model of candidateModels) {
      try {
        response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: messages.map((m) => ({
                role: m.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: m.content }],
              })),
              systemInstruction: {
                parts: [{ text: systemPrompt }],
              },
            }),
          }
        );

        if (response.ok) {
          break;
        } else {
          lastErrorDetail = await response.text();
        }
      } catch (err) {
        lastErrorDetail = String(err);
      }
    }

    if (!response.ok) {
      const detail = await response.text();
      const errorBody = { error: 'Gemini API request failed', detail };
      if (isWebReq) {
        return new Response(JSON.stringify(errorBody), {
          status: 502,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return res.status(502).json(errorBody);
    }

    const data = await response.json();
    const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    const successBody = {
      answer: answer || 'I could not generate a response right now. Please try again.',
    };

    if (isWebReq) {
      return new Response(JSON.stringify(successBody), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return res.status(200).json(successBody);
  } catch (error) {
    const errorBody = { error: 'Unexpected server error', detail: String(error) };
    if (isWebReq) {
      return new Response(JSON.stringify(errorBody), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return res.status(500).json(errorBody);
  }
}


