import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import CookieNotice from './CookieNotice';
import { OPEN_COOKIE_NOTICE_EVENT } from '@/cookieNotice';

describe('CookieNotice', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('discloses analytics and remembers dismissal', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <CookieNotice />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'Cookie notice' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Got it' }));

    expect(localStorage.getItem('cookieNoticeDismissed')).toBe('true');
    expect(screen.queryByRole('heading', { name: 'Cookie notice' })).not.toBeInTheDocument();
  });

  it('stays hidden after dismissal and can be reopened from the footer', async () => {
    localStorage.setItem('cookieNoticeDismissed', 'true');
    render(
      <MemoryRouter>
        <CookieNotice />
      </MemoryRouter>,
    );

    expect(screen.queryByRole('heading', { name: 'Cookie notice' })).not.toBeInTheDocument();
    window.dispatchEvent(new Event(OPEN_COOKIE_NOTICE_EVENT));

    expect(await screen.findByRole('heading', { name: 'Cookie notice' })).toBeInTheDocument();
  });
});
