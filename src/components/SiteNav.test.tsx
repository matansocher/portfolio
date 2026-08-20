import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import SiteNav from '@/components/SiteNav';

function renderSiteNav(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <SiteNav />
    </MemoryRouter>,
  );
}

describe('SiteNav', () => {
  it('renders the primary navigation links', () => {
    renderSiteNav();

    expect(screen.getByRole('button', { name: /Projects/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Articles' })).toBeInTheDocument();
  });

  it('renders a Contact button linking to the business card page', () => {
    renderSiteNav();

    const contact = screen.getByRole('link', { name: 'Let’s talk' });
    expect(contact).toBeInTheDocument();
    expect(contact).toHaveAttribute('href', '/business-card');
  });

  it('opens the projects dropdown with links to each case study', async () => {
    const user = userEvent.setup();
    renderSiteNav();

    await user.click(screen.getByRole('button', { name: /Projects/i }));

    expect(screen.getByRole('link', { name: 'Salary Additions' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Myco' })).toBeInTheDocument();
  });

  it('marks the current section as active', () => {
    renderSiteNav('/articles');
    expect(screen.getByRole('link', { name: 'Articles' })).toHaveClass('active');
  });

  it('exposes a verified LinkedIn profile link with rel="me"', () => {
    renderSiteNav();

    const linkedin = screen.getByRole('link', { name: /LinkedIn/i });
    expect(linkedin).toHaveAttribute('href', 'https://www.linkedin.com/in/dekelnissim/');
    expect(linkedin).toHaveAttribute('rel', 'me noopener noreferrer');
    expect(linkedin).toHaveAttribute('target', '_blank');
  });
});
