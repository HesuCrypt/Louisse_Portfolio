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
      sound.playPop();
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

    sound.playClick();
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
      className={`fixed right-4 md:right-6 z-[60] transition-all duration-300 ${
        hasCookieBanner ? 'bottom-24 md:bottom-6' : 'bottom-6'
      }`}
    >
      {!isOpen ? (
        <button
          onClick={() => {
            sound.playPop();
            setIsOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/90 backdrop-blur-md px-4 py-2.5 text-xs text-white shadow-xl hover:border-neutral-600 hover:bg-neutral-800 transition-all cursor-pointer group"
          aria-label="Open AI chat assistant"
        >
          <MessageCircle size={15} className="text-neutral-400 group-hover:text-white transition-colors" />
          <span className="font-medium">Ask AI</span>
        </button>
      ) : (
        <div className="w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl border border-neutral-800 bg-neutral-950/95 backdrop-blur-md shadow-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-3 bg-neutral-900/50">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                <Bot size={15} />
              </div>
              <div>
                <p className="text-white text-sm font-medium flex items-center gap-1.5">
                  <span>AI Assistant</span>
                </p>
                <p className="text-[11px] text-neutral-400">Pricing, scope &amp; technical consultant</p>
              </div>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setIsOpen(false);
              }}
              className="text-neutral-400 hover:text-white transition-colors cursor-pointer p-1"
              aria-label="Close AI chat assistant"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div ref={messagesContainerRef} className="h-[50vh] sm:h-80 max-h-[380px] overflow-y-auto p-3.5 sm:p-4 space-y-3">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[88%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  message.role === 'assistant'
                    ? 'bg-neutral-900 text-neutral-200 border border-neutral-800/80'
                    : 'bg-white text-black ml-auto font-normal'
                }`}
              >
                {message.content}
              </div>
            ))}
            {isLoading && (
              <div className="max-w-[88%] rounded-xl px-3.5 py-2.5 text-sm bg-neutral-900 text-neutral-400 border border-neutral-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>AI is typing...</span>
              </div>
            )}
          </div>

          {/* Quick-Prompt Suggestion Chips */}
          <div className="px-3 pt-2 pb-1 border-t border-neutral-900 bg-neutral-950/70 overflow-x-auto">
            <div className="flex items-center gap-1.5 pb-1">
              <Sparkles size={11} className="text-neutral-500 shrink-0" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 shrink-0">Quick Ask:</span>
              {promptSuggestions.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleQuickPrompt(prompt)}
                  disabled={isLoading}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 whitespace-nowrap shrink-0 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Bar */}
          <div className="border-t border-neutral-800 p-3 bg-neutral-950">
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
                className="inline-flex items-center justify-center rounded-lg bg-white text-black p-2.5 hover:bg-neutral-200 transition-colors disabled:opacity-50 cursor-pointer"
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
