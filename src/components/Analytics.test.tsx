import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ReactGA from 'react-ga4';
import Analytics from './Analytics';

vi.mock('react-ga4', () => ({
  default: {
    initialize: vi.fn(),
    send: vi.fn(),
  },
}));

describe('Analytics', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('initializes Google Analytics without waiting for notice dismissal', async () => {
    render(
      <MemoryRouter initialEntries={['/privacy']}>
        <Analytics />
      </MemoryRouter>,
    );

    await waitFor(() => expect(ReactGA.initialize).toHaveBeenCalledOnce());
    expect(ReactGA.send).toHaveBeenCalledWith({ hitType: 'pageview', page: '/privacy' });
  });
});
