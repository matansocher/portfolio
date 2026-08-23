import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import EasterEgg from './EasterEgg';

async function typeSequence(text: string) {
  const user = userEvent.setup();
  for (const char of text) {
    await user.keyboard(char);
  }
}

describe('EasterEgg', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('does not render the image by default', () => {
    render(<EasterEgg />);
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.queryByAltText('A special surprise')).toBeNull();
  });

  it('shows the image when the secret is typed', async () => {
    render(<EasterEgg />);
    await typeSequence('gili');
    expect(screen.getByAltText('A special surprise')).toBeInTheDocument();
  });

  it('matches case-insensitively (Caps Lock on)', async () => {
    render(<EasterEgg />);
    await typeSequence('GILI');
    expect(screen.getByAltText('A special surprise')).toBeInTheDocument();
  });

  it('matches when the secret is typed within a longer sequence', async () => {
    render(<EasterEgg />);
    await typeSequence('abcgili');
    expect(screen.getByAltText('A special surprise')).toBeInTheDocument();
  });

  it('auto-closes after 3 seconds', async () => {
    render(<EasterEgg />);
    await typeSequence('gili');
    expect(screen.getByAltText('A special surprise')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.queryByAltText('A special surprise')).toBeNull();
  });

  it('closes when the close button is clicked', async () => {
    const user = userEvent.setup();
    render(<EasterEgg />);
    await typeSequence('gili');
    await user.click(screen.getByLabelText('Close'));
    expect(screen.queryByAltText('A special surprise')).toBeNull();
  });

  it('ignores keystrokes typed into an input field', async () => {
    const user = userEvent.setup();
    render(
      <>
        <input aria-label="test input" />
        <EasterEgg />
      </>,
    );
    await user.click(screen.getByLabelText('test input'));
    await user.keyboard('gili');
    expect(screen.queryByAltText('A special surprise')).toBeNull();
  });
});
