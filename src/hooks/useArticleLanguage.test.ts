import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useArticleLanguage from './useArticleLanguage';

describe('useArticleLanguage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('returns "en" as default language', () => {
    const { result } = renderHook(() => useArticleLanguage());
    expect(result.current[0]).toBe('en');
  });

  it('returns stored language from localStorage', () => {
    localStorage.setItem('articleLanguage', 'he');
    const { result } = renderHook(() => useArticleLanguage());
    expect(result.current[0]).toBe('he');
  });

  it('sets language in localStorage and updates state', () => {
    const { result } = renderHook(() => useArticleLanguage());

    act(() => {
      result.current[1]('he');
    });

    expect(result.current[0]).toBe('he');
    expect(localStorage.getItem('articleLanguage')).toBe('he');
  });

  it('syncs language across multiple hook instances via storage event', () => {
    const { result: result1 } = renderHook(() => useArticleLanguage());
    const { result: result2 } = renderHook(() => useArticleLanguage());

    expect(result1.current[0]).toBe('en');
    expect(result2.current[0]).toBe('en');

    act(() => {
      result1.current[1]('he');
    });

    expect(result1.current[0]).toBe('he');
    expect(result2.current[0]).toBe('he');
  });

  it('handles invalid stored values by defaulting to "en"', () => {
    localStorage.setItem('articleLanguage', 'invalid');
    const { result } = renderHook(() => useArticleLanguage());
    expect(result.current[0]).toBe('en');
  });
});
