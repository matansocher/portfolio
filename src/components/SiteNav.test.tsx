import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import SiteNav from '@/components/SiteNav';
import config from '@/config';

function renderSiteNav(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <SiteNav />
    </MemoryRouter>,
  );
}

// The burger and drawer are mobile-only (`display: none` above 800px). jsdom does not
// apply media queries, so those nodes stay hidden and accessible-name computation returns
// an empty string for them — hence label/text queries instead of role+name ones.
const menuButton = (label: string) => screen.getByLabelText(label);
const drawerLink = (drawer: HTMLElement, text: string) => within(drawer).getByText(text).closest('a');

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

  it('keeps the mobile drawer closed until the menu button is pressed', () => {
    renderSiteNav();

    expect(screen.queryByLabelText('Site menu')).not.toBeInTheDocument();
    expect(menuButton('Open menu')).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens a drawer with every case study and secondary link', async () => {
    const user = userEvent.setup();
    renderSiteNav();

    await user.click(menuButton('Open menu'));

    const drawer = screen.getByLabelText('Site menu');
    expect(drawer).toHaveAttribute('role', 'dialog');
    expect(menuButton('Close menu')).toHaveAttribute('aria-expanded', 'true');
    config.PROJECTS.forEach((project) => {
      expect(drawerLink(drawer, project.title)).toHaveAttribute('href', project.path);
    });
    expect(drawerLink(drawer, 'Articles')).toHaveAttribute('href', '/articles');
    expect(within(drawer).queryByText('FAQ')).not.toBeInTheDocument();
    expect(drawerLink(drawer, 'Let\u2019s talk')).toHaveAttribute('href', '/business-card');
  });

  it('closes the drawer on Escape', async () => {
    const user = userEvent.setup();
    renderSiteNav();

    await user.click(menuButton('Open menu'));
    await user.keyboard('{Escape}');

    expect(screen.queryByLabelText('Site menu')).not.toBeInTheDocument();
  });

  it('locks body scroll while the drawer is open and restores it after', async () => {
    const user = userEvent.setup();
    renderSiteNav();

    await user.click(menuButton('Open menu'));
    expect(document.body.style.overflow).toBe('hidden');

    await user.click(menuButton('Close menu'));
    expect(document.body.style.overflow).not.toBe('hidden');
  });
});
