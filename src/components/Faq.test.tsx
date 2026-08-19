import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Faq, { FAQ_ITEMS } from '@/components/Faq';

function renderFaq() {
  return render(<Faq />);
}

describe('Faq', () => {
  it('renders every question and answer as visible content', () => {
    renderFaq();

    for (const item of FAQ_ITEMS) {
      expect(screen.getByText(item.question)).toBeInTheDocument();
      expect(screen.getByText(item.answer)).toBeInTheDocument();
    }
  });

  it('emits valid FAQPage JSON-LD whose Q/A match the rendered content', () => {
    const { container } = renderFaq();

    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();

    const data = JSON.parse(script!.textContent ?? '');
    expect(data['@type']).toBe('FAQPage');
    expect(data.url).toBe('https://dekelnissim.com/business-card');
    expect(Array.isArray(data.mainEntity)).toBe(true);
    expect(data.mainEntity).toHaveLength(FAQ_ITEMS.length);

    data.mainEntity.forEach((entry: Record<string, unknown>, index: number) => {
      const item = FAQ_ITEMS[index];
      expect(entry['@type']).toBe('Question');
      expect(entry.name).toBe(item.question);
      const answer = entry.acceptedAnswer as Record<string, unknown>;
      expect(answer['@type']).toBe('Answer');
      expect(answer.text).toBe(item.answer);

      // Schema text must be present in the rendered DOM (Google requirement).
      expect(screen.getByText(item.question)).toBeInTheDocument();
      expect(screen.getByText(item.answer)).toBeInTheDocument();
    });
  });

  it('exposes each answer within a disclosure element', () => {
    const { container } = renderFaq();
    const details = container.querySelectorAll('details');
    expect(details).toHaveLength(FAQ_ITEMS.length);

    details.forEach((detail, index) => {
      expect(within(detail).getByText(FAQ_ITEMS[index].answer)).toBeInTheDocument();
    });
  });
});
