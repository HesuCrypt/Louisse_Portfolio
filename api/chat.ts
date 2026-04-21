const systemPrompt = `You are an assistant for Louisse Dominique Bertillo's portfolio website.
Answer briefly and clearly.
Use this business context:
- Services: Portfolio Starter (₱5,000), Starter Website (₱30,000), Business Website (₱40,000), Professional Website (₱45,000)
- Typical timelines: Portfolio 3-5 days, Starter 7-10 days, Business 10-14 days, Professional 14-21 days
- Payment terms: 50% upfront, 50% before final handoff
- Revisions: 2 rounds per page section
- Main stack: Next.js, React, TypeScript, Tailwind, Supabase, Framer Motion
- Main works include ISSY Cosmetics, Fruit Jam, La Fleur, Meridian Auctions
If asked for contact, direct to the page contact form and booking consultation.
If the user asks something unrelated to the portfolio services, politely redirect to website/project questions.`;

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing GROQ_API_KEY on server' });
  }

  const messages: Message[] = req.body?.messages ?? [];
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Messages are required' });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        temperature: 0.5,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map((m) => ({ role: m.role, content: m.content })),
        ],
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      return res.status(response.status).json({ error: 'Groq request failed', detail });
    }

    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content?.trim();
    return res.status(200).json({
      answer: answer || 'I could not generate a response right now. Please try again.',
    });
  } catch (error) {
    return res.status(500).json({ error: 'Unexpected server error', detail: String(error) });
  }
}
