const systemPrompt = `You are Louisse Dominique Bertillo's personal website assistant.
Your role is to sound like his professional assistant: warm, confident, concise, and helpful.
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

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing GEMINI_API_KEY on server' });
  }

  const messages: Message[] = req.body?.messages ?? [];
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Messages are required' });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-3.5-flash:generateContent?key=${apiKey}`,
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

    if (!response.ok) {
      const detail = await response.text();
      return res.status(response.status).json({ error: 'Gemini request failed', detail });
    }

    const data = await response.json();
    const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    return res.status(200).json({
      answer: answer || 'I could not generate a response right now. Please try again.',
    });
  } catch (error) {
    return res.status(500).json({ error: 'Unexpected server error', detail: String(error) });
  }
}

