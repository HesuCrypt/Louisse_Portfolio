import React from 'react';
import { pushRoute } from '../utils/routing';

interface FormattedChatTextProps {
  content: string;
  isUser?: boolean;
}

type InlineToken =
  | { type: 'text'; text: string }
  | { type: 'bold'; text: string }
  | { type: 'italic'; text: string }
  | { type: 'code'; text: string }
  | { type: 'link'; text: string; url: string };

type Block =
  | { type: 'paragraph'; text: string }
  | { type: 'bullet'; items: string[] }
  | { type: 'number'; items: Array<{ num: string; text: string }> };

/**
 * Tokenize inline markdown elements (bold, italic, code, links, bare URLs, emails)
 * completely safely without dangerouslySetInnerHTML.
 */
export function parseInlineTokens(text: string): InlineToken[] {
  // Matches markdown links [label](url), URLs, emails, bold **...**, code `...`, italic *...*
  const tokenRegex =
    /(\[([^\]]+)\]\(([^)]+)\)|https?:\/\/[^\s<)]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\*\*([^*]+)\*\*|`([^`]+)`|\*([^*]+)\*)/g;

  const tokens: InlineToken[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({
        type: 'text',
        text: text.slice(lastIndex, match.index),
      });
    }

    const matchedStr = match[0];

    if (matchedStr.startsWith('**') && matchedStr.endsWith('**')) {
      tokens.push({ type: 'bold', text: matchedStr.slice(2, -2) });
    } else if (matchedStr.startsWith('`') && matchedStr.endsWith('`')) {
      tokens.push({ type: 'code', text: matchedStr.slice(1, -1) });
    } else if (matchedStr.startsWith('[') && matchedStr.endsWith(')')) {
      const linkMatch = matchedStr.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        tokens.push({ type: 'link', text: linkMatch[1], url: linkMatch[2] });
      } else {
        tokens.push({ type: 'text', text: matchedStr });
      }
    } else if (matchedStr.startsWith('http://') || matchedStr.startsWith('https://')) {
      tokens.push({ type: 'link', text: matchedStr, url: matchedStr });
    } else if (matchedStr.includes('@') && !matchedStr.startsWith('http')) {
      tokens.push({ type: 'link', text: matchedStr, url: `mailto:${matchedStr}` });
    } else if (matchedStr.startsWith('*') && matchedStr.endsWith('*')) {
      tokens.push({ type: 'italic', text: matchedStr.slice(1, -1) });
    } else {
      tokens.push({ type: 'text', text: matchedStr });
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push({
      type: 'text',
      text: text.slice(lastIndex),
    });
  }

  return tokens.length > 0 ? tokens : [{ type: 'text', text }];
}

/**
 * Parse a markdown response into structured blocks (paragraphs, bullet lists, numbered lists).
 */
export function parseBlocks(markdown: string): Block[] {
  const lines = markdown.split('\n');
  const blocks: Block[] = [];
  let currentList: { type: 'bullet'; items: string[] } | { type: 'number'; items: Array<{ num: string; text: string }> } | null = null;
  let currentParagraphLines: string[] = [];

  const flushParagraph = () => {
    if (currentParagraphLines.length > 0) {
      blocks.push({
        type: 'paragraph',
        text: currentParagraphLines.join(' ').trim(),
      });
      currentParagraphLines = [];
    }
  };

  const flushList = () => {
    if (currentList) {
      blocks.push(currentList);
      currentList = null;
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    // Bullet point: "* ", "- ", "• "
    const bulletMatch = trimmed.match(/^[*•\-]\s+(.*)$/);
    if (bulletMatch) {
      flushParagraph();
      if (!currentList || currentList.type !== 'bullet') {
        flushList();
        currentList = { type: 'bullet', items: [] };
      }
      currentList.items.push(bulletMatch[1]);
      continue;
    }

    // Numbered list item: "1. ", "2) "
    const numberMatch = trimmed.match(/^(\d+)[\.\)]\s+(.*)$/);
    if (numberMatch) {
      flushParagraph();
      if (!currentList || currentList.type !== 'number') {
        flushList();
        currentList = { type: 'number', items: [] };
      }
      currentList.items.push({ num: numberMatch[1], text: numberMatch[2] });
      continue;
    }

    // Regular text line
    if (currentList) {
      flushList();
    }
    currentParagraphLines.push(trimmed);
  }

  flushParagraph();
  flushList();

  return blocks;
}

export const FormattedChatText: React.FC<FormattedChatTextProps> = ({ content, isUser = false }) => {
  const blocks = React.useMemo(() => parseBlocks(content), [content]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    if (url.startsWith('/')) {
      e.preventDefault();
      pushRoute(url);
    } else if (url.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(url);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const renderInline = (text: string) => {
    const tokens = parseInlineTokens(text);
    return tokens.map((token, idx) => {
      switch (token.type) {
        case 'bold':
          return (
            <strong
              key={idx}
              className={`font-semibold tracking-[-0.01em] ${
                isUser ? 'text-ink font-bold' : 'text-fg'
              }`}
            >
              {token.text}
            </strong>
          );
        case 'italic':
          return (
            <em key={idx} className="italic">
              {token.text}
            </em>
          );
        case 'code':
          return (
            <code
              key={idx}
              className={`font-mono text-[0.75rem] px-1.5 py-0.5 border ${
                isUser
                  ? 'border-ink/20 bg-ink/10 text-ink'
                  : 'border-line-mid bg-panel-2 text-fg'
              }`}
            >
              {token.text}
            </code>
          );
        case 'link': {
          const isInternal = token.url.startsWith('/') || token.url.startsWith('#');
          return (
            <a
              key={idx}
              href={token.url}
              onClick={(e) => handleLinkClick(e, token.url)}
              target={isInternal ? undefined : '_blank'}
              rel={isInternal ? undefined : 'noreferrer noopener'}
              className={`underline decoration-line-strong underline-offset-2 transition-colors ${
                isUser
                  ? 'text-ink font-semibold decoration-ink/60 hover:text-ink/80'
                  : 'text-fg font-medium decoration-paper hover:text-paper'
              }`}
            >
              {token.text}
            </a>
          );
        }
        case 'text':
        default:
          return <React.Fragment key={idx}>{token.text}</React.Fragment>;
      }
    });
  };

  return (
    <div className={`space-y-2.5 text-[0.8125rem] leading-[1.65] ${isUser ? 'text-ink' : 'text-fg-muted'}`}>
      {blocks.map((block, bIdx) => {
        if (block.type === 'paragraph') {
          return <p key={bIdx}>{renderInline(block.text)}</p>;
        }

        if (block.type === 'bullet') {
          return (
            <ul key={bIdx} className="my-1.5 space-y-1.5 pl-0.5">
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-2">
                  <span
                    className={`mt-2 h-1.5 w-1.5 shrink-0 ${
                      isUser ? 'bg-ink' : 'bg-paper'
                    }`}
                    aria-hidden="true"
                  />
                  <span className="flex-1">{renderInline(item)}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === 'number') {
          return (
            <ol key={bIdx} className="my-1.5 space-y-1.5 pl-0.5">
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-2">
                  <span
                    className={`font-mono text-2xs font-bold min-w-[1.125rem] pt-0.5 shrink-0 ${
                      isUser ? 'text-ink' : 'text-fg-dim'
                    }`}
                  >
                    {String(item.num).padStart(2, '0')}.
                  </span>
                  <span className="flex-1">{renderInline(item.text)}</span>
                </li>
              ))}
            </ol>
          );
        }

        return null;
      })}
    </div>
  );
};

