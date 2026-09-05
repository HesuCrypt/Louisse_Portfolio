import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        {
          name: 'local-api-handler',
          configureServer(server) {
            server.middlewares.use((req, res, next) => {
              if (req.url?.startsWith('/api/chat') && req.method === 'POST') {
                let body = '';
                req.on('data', (chunk) => {
                  body += chunk;
                });
                req.on('end', async () => {
                  try {
                    const { messages } = JSON.parse(body);
                    const apiKey = env.GEMINI_API_KEY;
                    if (!apiKey) {
                      res.statusCode = 500;
                      res.setHeader('Content-Type', 'application/json');
                      res.end(JSON.stringify({ error: 'Missing GEMINI_API_KEY in .env.local' }));
                      return;
                    }

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

                    const candidateModels = ['gemini-3.6-flash', 'gemini-3.5-flash', 'gemini-flash-latest'];
                    let response: any = null;

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
                              contents: messages.map((m: any) => ({
                                role: m.role === 'assistant' ? 'model' : 'user',
                                parts: [{ text: m.content }],
                              })),
                              systemInstruction: {
                                parts: [{ text: systemPrompt }],
                              },
                            }),
                          }
                        );
                        if (response.ok) break;
                      } catch {
                        // try next candidate
                      }
                    }

                    if (!response.ok) {
                      const err = await response.text();
                      res.statusCode = response.status;
                      res.setHeader('Content-Type', 'application/json');
                      res.end(JSON.stringify({ error: 'Gemini request failed', detail: err }));
                      return;
                    }

                    const data = await response.json();
                    const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({
                      answer: answer || 'I could not generate a response right now. Please try again.'
                    }));
                  } catch (err: any) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: err.message || 'Internal error' }));
                  }
                });
              } else {
                next();
              }
            });
          }
        }
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
