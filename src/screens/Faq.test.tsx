import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Faq from '@/screens/Faq';
import { FAQ_ITEMS } from '@/components/Faq';

function renderScreen() {
  return render(
    <MemoryRouter initialEntries={['/faq']}>
      <Faq />
    </MemoryRouter>,
  );
}

describe('Faq screen', () => {
  it('renders the page heading', () => {
    renderScreen();
    expect(screen.getByRole('heading', { level: 1, name: /frequently asked questions/i })).toBeInTheDocument();
  });

  it('renders every question and answer', () => {
    renderScreen();
    for (const item of FAQ_ITEMS) {
      expect(screen.getByText(item.question)).toBeInTheDocument();
      expect(screen.getByText(item.answer)).toBeInTheDocument();
    }
  });

  it('emits FAQPage JSON-LD pointing at /faq that matches the rendered Q/A', () => {
    const { container } = renderScreen();
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();

    const data = JSON.parse(script!.textContent ?? '');
    expect(data['@type']).toBe('FAQPage');
    expect(data.url).toBe('https://dekelnissim.com/faq');
    expect(data.mainEntity).toHaveLength(FAQ_ITEMS.length);

    data.mainEntity.forEach((entry: Record<string, unknown>, index: number) => {
      const item = FAQ_ITEMS[index];
      expect(entry.name).toBe(item.question);
      const answer = entry.acceptedAnswer as Record<string, unknown>;
      expect(answer.text).toBe(item.answer);
      expect(screen.getByText(item.question)).toBeInTheDocument();
    });
  });

  it('exposes each answer within a disclosure element', () => {
    const { container } = renderScreen();
    const details = container.querySelectorAll('details');
    expect(details).toHaveLength(FAQ_ITEMS.length);
    details.forEach((detail, index) => {
      expect(within(detail).getByText(FAQ_ITEMS[index].answer)).toBeInTheDocument();
    });
  });
});
