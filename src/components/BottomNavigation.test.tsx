import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import BottomNavigation from '@/components/BottomNavigation';

function renderNav(pathname: string) {
  return render(
    <MemoryRouter>
      <BottomNavigation pathname={pathname} />
    </MemoryRouter>,
  );
}

describe('BottomNavigation', () => {
  it('shows both previous and next links for a middle case study', () => {
    renderNav('marketer');

    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Salary Additions')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Myco')).toBeInTheDocument();
  });

  it('shows only a next link for the first case study', () => {
    renderNav('salaries');

    expect(screen.queryByText('Previous')).not.toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Marketer')).toBeInTheDocument();
  });

  it('shows only a previous link for the last case study', () => {
    renderNav('employees');

    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Myco')).toBeInTheDocument();
    expect(screen.queryByText('Next')).not.toBeInTheDocument();
  });
});
