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
  it('renders the name link and contact email', () => {
    renderNavbar();

    expect(screen.getByRole('link', { name: 'Dekel Nissim' })).toBeInTheDocument();
    expect(screen.getByText('dklnsm@gmail.com')).toBeInTheDocument();
  });

  it('shows a "Contact Me" button only in card nav mode', () => {
    renderNavbar({ isCardNav: true });
    expect(screen.getByRole('button', { name: 'Contact Me' })).toBeInTheDocument();
  });

  it('reveals the "Copied!" confirmation after clicking the email', async () => {
    const user = userEvent.setup();
    renderNavbar();

    const copied = screen.getByText('Copied!');
    expect(copied.parentElement).toHaveStyle({ opacity: '0' });

    await user.click(screen.getByText('dklnsm@gmail.com'));

    expect(copied.parentElement).toHaveStyle({ opacity: '1' });
  });
});
