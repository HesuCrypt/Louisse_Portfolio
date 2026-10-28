import { describe, it, expect } from 'vitest';
import { parseInlineTokens, parseBlocks } from '../../ui/FormattedChatText';

describe('FormattedChatText parser', () => {
  it('parses inline bold, code, links, and text', () => {
    const text = 'Here is **Business Package (₱45,000)** with `local SEO` and [Full Rates](/services).';
    const tokens = parseInlineTokens(text);

    expect(tokens).toEqual([
      { type: 'text', text: 'Here is ' },
      { type: 'bold', text: 'Business Package (₱45,000)' },
      { type: 'text', text: ' with ' },
      { type: 'code', text: 'local SEO' },
      { type: 'text', text: ' and ' },
      { type: 'link', text: 'Full Rates', url: '/services' },
      { type: 'text', text: '.' },
    ]);
  });

  it('detects standalone emails and URLs as clickable links', () => {
    const text = 'Reach out at louissebertillo2004@gmail.com or visit https://louissebaja.com today.';
    const tokens = parseInlineTokens(text);

    expect(tokens.some((t) => t.type === 'link' && t.url === 'mailto:louissebertillo2004@gmail.com')).toBe(true);
    expect(tokens.some((t) => t.type === 'link' && t.url === 'https://louissebaja.com')).toBe(true);
  });

  it('correctly splits paragraphs and bullet lists', () => {
    const markdown = `
Introductory paragraph explaining the package options.

Here are the options:
* **One-Page Sprint (₱10,000):** 2–3 days turnaround.
* **Starter Website (₱30,000):** 5–7 days turnaround.

1. Submit project details.
2. Sign milestone agreement.

Closing sentence.
    `.trim();

    const blocks = parseBlocks(markdown);

    expect(blocks.length).toBe(5);
    expect(blocks[0].type).toBe('paragraph');
    expect(blocks[1].type).toBe('paragraph');
    expect(blocks[2].type).toBe('bullet');
    if (blocks[2].type === 'bullet') {
      expect(blocks[2].items.length).toBe(2);
    }
    expect(blocks[3].type).toBe('number');
    if (blocks[3].type === 'number') {
      expect(blocks[3].items.length).toBe(2);
      expect(blocks[3].items[0].num).toBe('1');
    }
    expect(blocks[4].type).toBe('paragraph');
  });
});

