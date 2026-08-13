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

    expect(screen.getByRole('heading', { name: 'Salary Additions' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Marketer' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Myco' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Employee Onboarding Page' })).toBeInTheDocument();
  });

  it('renders the About screen', () => {
    window.history.pushState({}, '', '/about');
    render(<App />);

    expect(screen.getByRole('heading', { name: /designs with evidence/i })).toBeInTheDocument();
  });

  it('redirects /projects to the Home screen', () => {
    window.history.pushState({}, '', '/projects');
    render(<App />);

    expect(screen.getByRole('heading', { name: /I’m Dekel/i })).toBeInTheDocument();
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
