import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Faq, { FAQ_ITEMS, faqPageSchema } from '@/components/Faq';

function renderFaq(props?: { showFaqPageLink?: boolean }) {
  return render(
    <MemoryRouter>
      <Faq {...props} />
    </MemoryRouter>,
  );
}

describe('Faq', () => {
  it('renders every question and answer as visible content', () => {
    renderFaq();

    for (const item of FAQ_ITEMS) {
      expect(screen.getByText(item.question)).toBeInTheDocument();
      expect(screen.getByText(item.answer)).toBeInTheDocument();
    }
  });

  it('does not render the FAQPage JSON-LD itself (marked up once on /faq)', () => {
    const { container } = renderFaq();
    expect(container.querySelector('script[type="application/ld+json"]')).toBeNull();
  });

  it('exposes each answer within a disclosure element', () => {
    const { container } = renderFaq();
    const details = container.querySelectorAll('details');
    expect(details).toHaveLength(FAQ_ITEMS.length);

    details.forEach((detail, index) => {
      expect(within(detail).getByText(FAQ_ITEMS[index].answer)).toBeInTheDocument();
    });
  });

  it('renders a link to the dedicated /faq page only when asked', () => {
    const { rerender } = renderFaq();
    expect(screen.queryByRole('link', { name: /frequently asked questions/i })).toBeNull();

    rerender(
      <MemoryRouter>
        <Faq showFaqPageLink />
      </MemoryRouter>,
    );
    expect(screen.getByRole('link', { name: /frequently asked questions/i })).toHaveAttribute('href', '/faq');
  });
});

describe('faqPageSchema', () => {
  it('is a FAQPage whose Q/A match FAQ_ITEMS and points at /faq', () => {
    expect(faqPageSchema['@type']).toBe('FAQPage');
    expect(faqPageSchema.url).toBe('https://dekelnissim.com/faq');
    expect(faqPageSchema.mainEntity).toHaveLength(FAQ_ITEMS.length);

    faqPageSchema.mainEntity.forEach((entry, index) => {
      const item = FAQ_ITEMS[index];
      expect(entry['@type']).toBe('Question');
      expect(entry.name).toBe(item.question);
      expect(entry.acceptedAnswer['@type']).toBe('Answer');
      expect(entry.acceptedAnswer.text).toBe(item.answer);
    });
  });
});
