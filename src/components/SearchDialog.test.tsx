import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import SearchDialog from './SearchDialog';

function LocationProbe() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

function renderDialog(onClose = vi.fn()) {
  render(
    <MemoryRouter initialEntries={['/']}>
      <SearchDialog isOpen onClose={onClose} />
      <Routes>
        <Route path="*" element={<LocationProbe />} />
      </Routes>
    </MemoryRouter>,
  );
  return { onClose };
}

describe('SearchDialog', () => {
  it('renders the search input when open', () => {
    renderDialog();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <MemoryRouter>
        <SearchDialog isOpen={false} onClose={vi.fn()} />
      </MemoryRouter>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('filters results as the user types', async () => {
    const user = userEvent.setup();
    renderDialog();
    await user.type(screen.getByRole('combobox'), 'marketer');
    expect(screen.getByRole('option', { name: /Marketer/i })).toBeInTheDocument();
  });

  it('shows a no-results state for an unknown query', async () => {
    const user = userEvent.setup();
    renderDialog();
    await user.type(screen.getByRole('combobox'), 'zzzznotachance');
    expect(screen.getByText(/No results for/i)).toBeInTheDocument();
  });

  it('navigates and closes when a result is clicked', async () => {
    const user = userEvent.setup();
    const { onClose } = renderDialog();
    await user.type(screen.getByRole('combobox'), 'marketer');
    await user.click(screen.getByRole('option', { name: /Marketer/i }));
    expect(onClose).toHaveBeenCalled();
    expect(screen.getByTestId('location')).toHaveTextContent('/marketer');
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();
    const { onClose } = renderDialog();
    await user.type(screen.getByRole('combobox'), '{Escape}');
    expect(onClose).toHaveBeenCalled();
  });

  it('navigates to the active result on Enter', async () => {
    const user = userEvent.setup();
    renderDialog();
    await user.type(screen.getByRole('combobox'), 'marketer{Enter}');
    expect(screen.getByTestId('location')).toHaveTextContent('/marketer');
  });
});
