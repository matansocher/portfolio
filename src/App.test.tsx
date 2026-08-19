import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '@/App';

describe('App routing', () => {
  it('renders the Home screen on the catch-all route', () => {
    window.history.pushState({}, '', '/');
    render(<App />);

    expect(screen.getByRole('heading', { name: /decisions teams can trust/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Salary Exceptions & HR Dashboard' })).toBeInTheDocument();
  });

  it('lists the case-study projects on Home', () => {
    window.history.pushState({}, '', '/');
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Salary Exceptions & HR Dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'AppDX – Experience Monitoring' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Marketer – Internal Marketing Platform' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Employee Onboarding Screen' })).toBeInTheDocument();
  });

  it('shows the NotFound screen for unknown routes', () => {
    window.history.pushState({}, '', '/projects');
    render(<App />);

    expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument();
  });

  it('renders the Articles list screen', () => {
    window.history.pushState({}, '', '/articles');
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: 'Articles' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Making Financial Information Accessible/i })).toBeInTheDocument();
  });

  it('renders an article detail screen for a valid slug', () => {
    window.history.pushState({}, '', '/articles/making-financial-information-accessible');
    render(<App />);

    expect(
      screen.getByRole('heading', { level: 1, name: /Making Financial Information Accessible/i }),
    ).toBeInTheDocument();
  });

  it('shows a not-found state for an unknown article slug', () => {
    window.history.pushState({}, '', '/articles/does-not-exist');
    render(<App />);

    expect(screen.getByRole('heading', { name: /Article not found/i })).toBeInTheDocument();
  });
});
