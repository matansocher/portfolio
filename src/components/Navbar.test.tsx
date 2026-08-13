import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Navbar from '@/components/Navbar';

function renderNavbar(props = {}) {
  return render(
    <MemoryRouter>
      <Navbar {...props} />
    </MemoryRouter>,
  );
}

describe('Navbar', () => {
  it('renders the name link and contact link', () => {
    renderNavbar();

    expect(screen.getByRole('link', { name: 'Dekel Nissim' })).toBeInTheDocument();
    const contact = screen.getByRole('link', { name: 'Contact' });
    expect(contact).toBeInTheDocument();
    expect(contact.getAttribute('href')).toBe('/contact');
  });

  it('shows a "Contact Me" button only in card nav mode', () => {
    renderNavbar({ isCardNav: true });
    expect(screen.getByRole('button', { name: 'Contact Me' })).toBeInTheDocument();
  });
});
