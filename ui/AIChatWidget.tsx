import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, SendHorizontal, Sparkles, Bot } from 'lucide-react';
import { sound } from '../utils/sound';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const starterMessage =
  "Hi! I'm Louisse's AI assistant. Ask me about website packages, timelines, tech stack, or which package fits your business.";

const promptSuggestions = [
  'What does the ₱45k Business tier include?',
  'How does the 50/50 payment split work?',
  'Tell me about the ₱100k Bespoke Web App',
  'What is the turnaround for Starter (₱30k)?',
];

export function openAIChat(prompt?: string) {
  window.dispatchEvent(new CustomEvent('open-ai-chat', { detail: { prompt } }));
}

export const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: starterMessage },
  ]);

  const [hasCookieBanner, setHasCookieBanner] = useState(false);

  useEffect(() => {
    const handleOpenChat = (event: Event) => {
      const customEvent = event as CustomEvent<{ prompt?: string }>;
      setIsOpen(true);
      if (customEvent?.detail?.prompt) {
        setInput(customEvent.detail.prompt);
      }
    };

    window.addEventListener('open-ai-chat', handleOpenChat);
    return () => window.removeEventListener('open-ai-chat', handleOpenChat);
  }, []);

  useEffect(() => {
    const handleBanner = (event: Event) => {
      const customEvent = event as CustomEvent<{ visible?: boolean }>;
      setHasCookieBanner(Boolean(customEvent.detail?.visible));
    };

    window.addEventListener('cookie-banner-visibility', handleBanner);
    return () => window.removeEventListener('cookie-banner-visibility', handleBanner);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, [messages, isLoading, isOpen]);

  const sendMessage = async (overrideText?: string) => {
    const textToSend = (overrideText ?? input).trim();
    if (!textToSend || isLoading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: textToSend }];
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
        let errorMessage = 'REQUEST_FAILED';
        let hasErrorJson = false;
        try {
          const errorData = await response.json();
          if (errorData?.error) {
            errorMessage = String(errorData.error);
            hasErrorJson = true;
          }
        } catch {
          // Ignore JSON parse issues
        }

        if (response.status === 404 && !hasErrorJson) {
          throw new Error('API_ROUTE_MISSING');
        }

        throw new Error(errorMessage);
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
              'Chat API route is not available on this deployment. Make sure your project is deployed to Vercel and GEMINI_API_KEY is set in Vercel Environment Variables.',
          },
        ]);
        setIsLoading(false);
        return;
      }
      let fallbackMessage =
        'I hit an error while contacting the AI service. Please retry in a moment or use the contact form below.';

      if (error instanceof Error) {
        if (
          error.message === 'Missing GEMINI_API_KEY on server' ||
          error.message === 'Missing GEMINI_API_KEY in .env.local'
        ) {
          fallbackMessage =
            'AI chat is not configured yet on Vercel. Please add GEMINI_API_KEY in Vercel Project Settings > Environment Variables, then redeploy.';
        } else if (
          error.message.includes('Gemini') ||
          error.message.includes('503') ||
          error.message.includes('demand')
        ) {
          fallbackMessage =
            'The AI service is experiencing a temporary surge in demand. Please try asking again in a few moments, or reach out directly using the contact form below.';
        }
      }

      setMessages([
        ...nextMessages,
        {
          role: 'assistant',
          content: fallbackMessage,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    void sendMessage(prompt);
  };

  return (
    <div
      className={`fixed right-4 z-[60] transition-all duration-300 md:right-6 ${
        hasCookieBanner
          ? isOpen
            ? 'bottom-[calc(var(--strip-h)+1rem)] md:bottom-6'
            : 'hidden md:block md:bottom-6'
          : 'bottom-[calc(var(--strip-h)+1rem)] md:bottom-6'
      }`}
    >
      {!isOpen ? (
        <button
          onClick={() => {
            sound.playPop();
            setIsOpen(true);
          }}
          className="inline-flex cursor-pointer items-center gap-2 border border-line-mid bg-ink px-4 py-2.5 font-mono text-2xs tracking-wider2 text-fg uppercase transition-colors duration-200 hover:border-paper hover:bg-paper hover:text-ink"
          aria-label="Open AI chat assistant"
        >
          <MessageCircle size={15} aria-hidden="true" />
          <span>Ask AI</span>
        </button>
      ) : (
        <div className="flex w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden border border-line-mid bg-ink">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center border border-line-strong text-fg">
                <Bot size={15} aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-2xs tracking-label text-fg uppercase">AI Assistant</p>
                <p className="mt-0.5 font-mono text-2xs text-fg-dim">
                  Pricing, scope &amp; technical consultant
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className="cursor-pointer p-1 text-fg-dim transition-colors hover:text-fg"
              aria-label="Close AI chat assistant"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={messagesContainerRef}
            className="h-[50vh] max-h-[380px] space-y-3 overflow-y-auto bg-panel p-3.5 sm:h-80 sm:p-4"
          >
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[88%] border px-3.5 py-2.5 text-[0.8125rem] leading-relaxed ${
                  message.role === 'assistant'
                    ? 'border-line bg-ink text-fg-muted'
                    : 'ml-auto border-paper bg-paper text-ink'
                }`}
              >
                {message.content}
              </div>
            ))}
            {isLoading && (
              <div className="flex max-w-[88%] items-center gap-2 border border-line bg-ink px-3.5 py-2.5 font-mono text-2xs tracking-wider2 text-fg-dim uppercase">
                <span className="h-1.5 w-1.5 shrink-0 bg-paper" aria-hidden="true" />
                <span>AI is typing…</span>
              </div>
            )}
          </div>

          {/* Quick-prompt suggestion chips */}
          <div className="no-scrollbar overflow-x-auto border-t border-line px-3 pt-2 pb-2">
            <div className="flex items-center gap-2 pb-1">
              <Sparkles size={11} className="shrink-0 text-fg-dim" aria-hidden="true" />
              <span className="shrink-0 font-mono text-2xs tracking-wider2 text-fg-dim uppercase">
                Quick Ask
              </span>
              {promptSuggestions.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleQuickPrompt(prompt)}
                  disabled={isLoading}
                  className="shrink-0 cursor-pointer whitespace-nowrap border border-line px-2.5 py-1 font-mono text-2xs text-fg-muted transition-colors hover:border-line-strong hover:text-fg disabled:opacity-40"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input bar */}
          <div className="border-t border-line p-3">
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
                className="flex-1 border border-line-mid bg-ink px-3 py-2 font-sans text-[0.8125rem] text-fg transition-colors placeholder-fg-faint focus-visible:border-paper focus-visible:outline-none"
              />
              <button
                onClick={() => void sendMessage()}
                className="inline-flex cursor-pointer items-center justify-center border border-paper bg-paper p-2.5 text-ink transition-colors duration-200 hover:bg-ink hover:text-paper disabled:opacity-40"
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
