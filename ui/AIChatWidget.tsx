import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, SendHorizontal, Sparkles, Bot, RotateCcw, Copy, Check, ChevronDown } from 'lucide-react';
import { sound } from '../utils/sound';
import { FormattedChatText } from './FormattedChatText';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type QuickPrompt = {
  id: string;
  label: string;
  prompt: string;
};

const starterMessage =
  "Hi! I'm Louisse's AI assistant. Ask me about **website packages**, timelines, tech stack, or which package fits your business best.";

const quickPrompts: QuickPrompt[] = [
  {
    id: 'recommend',
    label: 'Help Me Choose',
    prompt: 'Can you help me choose the right website or web app package for my business?',
  },
  {
    id: 'business',
    label: '₱45k Business Tier',
    prompt: 'What does the ₱45,000 Business Website package include and what are the deliverables?',
  },
  {
    id: 'bespoke',
    label: '₱100k Bespoke App',
    prompt: 'Tell me more about the ₱100,000 Bespoke Web App flagship experience.',
  },
  {
    id: 'turnaround',
    label: 'Turnaround Times',
    prompt: 'What are the estimated turnaround times for each website package?',
  },
  {
    id: 'terms',
    label: '50/50 Payment Terms',
    prompt: 'How does your 50/50 payment milestone split and 30-day warranty work?',
  },
];

export function openAIChat(prompt?: string) {
  window.dispatchEvent(new CustomEvent('open-ai-chat', { detail: { prompt } }));
}

export const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showQuickAsk, setShowQuickAsk] = useState(true);
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

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      sound.playClick();
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // Ignore clipboard write failures
    }
  };

  const handleResetChat = () => {
    sound.playClick();
    setMessages([{ role: 'assistant', content: starterMessage }]);
    setInput('');
  };

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

      sound.playPop();

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
      className={`fixed right-3 z-[60] transition-all duration-300 sm:right-6 ${
        hasCookieBanner
          ? isOpen
            ? 'bottom-[calc(var(--strip-h)+0.75rem)] md:bottom-6'
            : 'hidden md:block md:bottom-6'
          : 'bottom-[calc(var(--strip-h)+0.75rem)] md:bottom-6'
      }`}
    >
      {!isOpen ? (
        <button
          onClick={() => {
            sound.playPop();
            setIsOpen(true);
          }}
          className="inline-flex cursor-pointer items-center gap-2 border border-line-mid bg-ink px-4 py-2.5 font-mono text-2xs tracking-wider2 text-fg uppercase transition-colors duration-200 hover:border-paper hover:bg-paper hover:text-ink shadow-lg"
          aria-label="Open AI chat assistant"
        >
          <MessageCircle size={15} aria-hidden="true" />
          <span>Ask AI</span>
        </button>
      ) : (
        <div className="flex w-[390px] max-w-[calc(100vw-1.5rem)] flex-col overflow-hidden border border-line-strong bg-ink shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 bg-panel/60">
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center border border-line-strong bg-ink text-fg">
                <Bot size={15} aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-2xs tracking-label text-fg uppercase">AI Assistant</p>
                <p className="mt-0.5 font-mono text-2xs text-fg-dim">
                  Pricing, scope &amp; technical consultant
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleResetChat}
                className="cursor-pointer p-1.5 text-fg-dim transition-colors hover:text-fg"
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <RotateCcw size={14} />
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setIsOpen(false);
                }}
                className="cursor-pointer p-1.5 text-fg-dim transition-colors hover:text-fg"
                aria-label="Close AI chat assistant"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={messagesContainerRef}
            className="h-[52vh] max-h-[400px] space-y-3.5 overflow-y-auto bg-panel p-3.5 sm:h-84 sm:p-4"
          >
            {messages.map((message, index) => {
              const isAssistant = message.role === 'assistant';
              return (
                <div
                  key={`${message.role}-${index}`}
                  className={`group relative max-w-[90%] border px-3.5 py-3 transition-colors ${
                    isAssistant
                      ? 'border-line-mid bg-ink text-fg-muted'
                      : 'ml-auto border-paper bg-paper text-ink font-medium shadow-sm'
                  }`}
                >
                  <FormattedChatText content={message.content} isUser={!isAssistant} />

                  {isAssistant && (
                    <button
                      type="button"
                      onClick={() => handleCopy(message.content, index)}
                      className="absolute top-2 right-2 opacity-0 transition-opacity duration-150 group-hover:opacity-100 p-1 text-fg-faint hover:text-fg bg-ink/90 border border-line"
                      title="Copy response"
                      aria-label="Copy response"
                    >
                      {copiedIndex === index ? (
                        <Check size={11} className="text-paper" />
                      ) : (
                        <Copy size={11} />
                      )}
                    </button>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex max-w-[88%] items-center gap-2.5 border border-line-mid bg-ink px-3.5 py-2.5 font-mono text-2xs tracking-wider2 text-fg-dim uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping bg-paper opacity-75" />
                  <span className="relative inline-flex h-2 w-2 bg-paper" />
                </span>
                <span>AI is consulting knowledge base…</span>
              </div>
            )}
          </div>

          {/* Quick-prompt suggestion chips */}
          <div className="border-t border-line bg-panel/50 px-3.5 py-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-mono text-2xs tracking-wider2 text-fg-dim uppercase">
                <Sparkles size={11} className="text-paper" aria-hidden="true" />
                <span>Quick Ask</span>
              </span>
              <button
                type="button"
                onClick={() => setShowQuickAsk(!showQuickAsk)}
                className="flex cursor-pointer items-center gap-1 font-mono text-[10px] tracking-wider2 text-fg-faint uppercase transition-colors hover:text-fg"
                aria-label={showQuickAsk ? 'Hide quick prompts' : 'Show quick prompts'}
              >
                <span>{showQuickAsk ? 'Hide' : `${quickPrompts.length} Topics`}</span>
                <ChevronDown
                  size={11}
                  className={`transition-transform duration-200 ${showQuickAsk ? 'rotate-180' : ''}`}
                />
              </button>
            </div>

            {showQuickAsk && (
              <div className="mt-2 flex flex-wrap gap-1.5 pt-0.5">
                {quickPrompts.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleQuickPrompt(item.prompt)}
                    disabled={isLoading}
                    className="cursor-pointer border border-line-mid bg-ink px-2.5 py-1 font-mono text-2xs text-fg-muted transition-all duration-150 hover:border-paper hover:bg-paper hover:text-ink disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.98]"
                    title={item.prompt}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input bar */}
          <div className="border-t border-line p-3 bg-ink">
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
                placeholder="Ask about packages, rates, scope..."
                className="flex-1 border border-line-mid bg-panel px-3 py-2 font-sans text-[0.8125rem] text-fg transition-colors placeholder:text-fg-faint focus-visible:border-paper focus-visible:outline-none"
              />
              <button
                type="button"
                onClick={() => void sendMessage()}
                className="inline-flex cursor-pointer items-center justify-center border border-paper bg-paper p-2.5 text-ink transition-colors duration-200 hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-40"
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

