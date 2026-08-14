import { useCallback, useEffect, useState } from 'react';
import type { ArticleLanguage } from '../types';

const STORAGE_KEY = 'articleLanguage';
const EVENT_NAME = 'articlelanguagechange';

function isLanguage(value: unknown): value is ArticleLanguage {
  return value === 'en' || value === 'he';
}

function readLanguage(): ArticleLanguage {
  if (typeof window === 'undefined') {
    return 'en';
  }
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isLanguage(stored) ? stored : 'en';
}

export default function useArticleLanguage(): [ArticleLanguage, (language: ArticleLanguage) => void] {
  const [language, setLanguageState] = useState<ArticleLanguage>(readLanguage);

  useEffect(() => {
    const sync = () => setLanguageState(readLanguage());
    window.addEventListener(EVENT_NAME, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT_NAME, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const setLanguage = useCallback((next: ArticleLanguage) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    setLanguageState(next);
    window.dispatchEvent(new Event(EVENT_NAME));
  }, []);

  return [language, setLanguage];
}
