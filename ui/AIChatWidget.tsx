import React, { useState } from 'react';
import { MessageCircle, X, SendHorizontal } from 'lucide-react';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const starterMessage =
  "Hi! I'm Louisse's AI assistant. Ask me about website packages, timelines, tech stack, or which package fits your business.";

export const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: starterMessage },
  ]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: nextMessages,
        }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('API_ROUTE_MISSING');
        }
        throw new Error('REQUEST_FAILED');
      }

      const data = await response.json();
      const answer = data?.answer?.trim();

      setMessages([
        ...nextMessages,
        {
          role: 'assistant',
          content: answer || 'I could not generate a response right now. Please try again.',
        },
      ]);
    } catch (error) {
      if (error instanceof Error && error.message === 'API_ROUTE_MISSING') {
        setMessages([
          ...nextMessages,
          {
            role: 'assistant',
            content:
              'Chat API route is not available in this local run. Deploy to Vercel (or run with a serverless-compatible dev setup) to use the secure chatbot.',
          },
        ]);
        setIsLoading(false);
        return;
      }
      setMessages([
        ...nextMessages,
        {
          role: 'assistant',
          content:
            'I hit an error while contacting the AI service. Please retry in a moment or use the contact form below.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/95 px-4 py-3 text-sm text-white shadow-xl hover:border-neutral-500 transition-colors"
          aria-label="Open AI chat assistant"
        >
          <MessageCircle size={16} />
          Ask AI
        </button>
      ) : (
        <div className="w-[340px] max-w-[calc(100vw-2rem)] rounded-2xl border border-neutral-800 bg-neutral-950/95 backdrop-blur-md shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-3">
            <div>
              <p className="text-white text-sm font-medium">AI Assistant</p>
              <p className="text-[11px] text-neutral-500">Ask about packages, pricing, or timeline</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white transition-colors"
              aria-label="Close AI chat assistant"
            >
              <X size={16} />
            </button>
          </div>

          <div className="h-80 overflow-y-auto p-4 space-y-3">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[90%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                  message.role === 'assistant'
                    ? 'bg-neutral-900 text-neutral-200 border border-neutral-800'
                    : 'bg-white text-black ml-auto'
                }`}
              >
                {message.content}
              </div>
            ))}
            {isLoading && (
              <div className="max-w-[90%] rounded-xl px-3 py-2 text-sm bg-neutral-900 text-neutral-400 border border-neutral-800">
                Thinking...
              </div>
            )}
          </div>

          <div className="border-t border-neutral-800 p-3">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    void sendMessage();
                  }
                }}
                placeholder="Ask about your project..."
                className="flex-1 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-600"
              />
              <button
                onClick={() => void sendMessage()}
                className="inline-flex items-center justify-center rounded-lg bg-white text-black p-2.5 hover:bg-neutral-200 transition-colors disabled:opacity-50"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
              >
                <SendHorizontal size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
