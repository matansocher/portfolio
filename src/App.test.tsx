import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '@/App';

describe('App routing', () => {
  it('renders the Home screen on the catch-all route', () => {
    window.history.pushState({}, '', '/');
    render(<App />);

    expect(screen.getByRole('heading', { name: /I’m Dekel/i })).toBeInTheDocument();
    expect(screen.getByText('Product Designer & UX Researcher')).toBeInTheDocument();
  });

  it('lists all case-study projects on Home', () => {
    window.history.pushState({}, '', '/');
    render(<App />);

    expect(screen.getByText('Salary Additions')).toBeInTheDocument();
    expect(screen.getByText('Marketer')).toBeInTheDocument();
    expect(screen.getByText('Myco')).toBeInTheDocument();
    expect(screen.getByText('Employee Onboarding Page')).toBeInTheDocument();
  });
});
