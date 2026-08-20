import './styles/SearchDialog.scss';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useArticleLanguage from '../hooks/useArticleLanguage';
import { searchContent, SEARCHABLE_PAGES } from '../utils/search';
import type { SearchArticleResult, SearchPageResult, SearchProjectResult } from '../utils/search';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

type FlatResult =
  | { kind: 'page'; item: SearchPageResult }
  | { kind: 'project'; item: SearchProjectResult }
  | { kind: 'article'; item: SearchArticleResult };

interface ResultGroup {
  label: string;
  icon: string;
  results: FlatResult[];
}

function highlight(text: string, query: string) {
  const term = query.trim();
  if (!term) return text;
  const index = text.toLowerCase().indexOf(term.toLowerCase());
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <mark>{text.slice(index, index + term.length)}</mark>
      {text.slice(index + term.length)}
    </>
  );
}

export default function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const navigate = useNavigate();
  const [language] = useArticleLanguage();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const isRtl = language === 'he';

  const groups = useMemo<ResultGroup[]>(() => {
    const term = query.trim();
    if (!term) {
      return [
        {
          label: 'Pages',
          icon: 'uil-web-grid',
          results: SEARCHABLE_PAGES.map((item) => ({ kind: 'page' as const, item })),
        },
      ];
    }
    const { pages, projects, articles } = searchContent(term, language);
    const built: ResultGroup[] = [];
    if (pages.length) {
      built.push({ label: 'Pages', icon: 'uil-web-grid', results: pages.map((item) => ({ kind: 'page', item })) });
    }
    if (projects.length) {
      built.push({ label: 'Projects', icon: 'uil-apps', results: projects.map((item) => ({ kind: 'project', item })) });
    }
    if (articles.length) {
      built.push({
        label: 'Articles',
        icon: 'uil-file-alt',
        results: articles.map((item) => ({ kind: 'article', item })),
      });
    }
    return built;
  }, [query, language]);

  const flatResults = useMemo(() => groups.flatMap((group) => group.results), [groups]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIndex(0);
      const id = window.requestAnimationFrame(() => inputRef.current?.focus());
      return () => window.cancelAnimationFrame(id);
    }
    return undefined;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    const active = listRef.current?.querySelector('[data-active="true"]');
    if (active && typeof active.scrollIntoView === 'function') {
      active.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  const goTo = useCallback(
    (result: FlatResult) => {
      const path = result.kind === 'page' ? result.item.path : result.item.url;
      onClose();
      navigate(path);
    },
    [navigate, onClose],
  );

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }
    if (!flatResults.length) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % flatResults.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + flatResults.length) % flatResults.length);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const result = flatResults[activeIndex];
      if (result) goTo(result);
    }
  };

  if (!isOpen) return null;

  let runningIndex = -1;

  return (
    <div
      className="search-dialog-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="search-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Search the site"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div className="search-dialog-field">
          <i className="uil uil-search search-dialog-field-icon" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            className="search-dialog-input"
            placeholder={isRtl ? 'חיפוש בעמודים ובמאמרים…' : 'Search pages and articles…'}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onKeyDown}
            role="combobox"
            aria-expanded="true"
            aria-controls="search-dialog-results"
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck={false}
          />
          <button type="button" className="search-dialog-close" onClick={onClose} aria-label="Close search">
            <kbd>esc</kbd>
          </button>
        </div>

        <div className="search-dialog-results" id="search-dialog-results" role="listbox" ref={listRef}>
          {flatResults.length === 0 ? (
            <div className="search-dialog-empty">
              <i className="uil uil-search-alt" aria-hidden="true" />
              <p>
                {isRtl ? 'לא נמצאו תוצאות עבור' : 'No results for'} “{query.trim()}”
              </p>
            </div>
          ) : (
            groups.map((group) => (
              <div className="search-dialog-group" key={group.label}>
                <div className="search-dialog-group-label">{group.label}</div>
                {group.results.map((result) => {
                  runningIndex += 1;
                  const index = runningIndex;
                  const isActive = index === activeIndex;
                  const title = result.item.title;
                  const subtitle =
                    result.kind === 'page'
                      ? result.item.description
                      : result.kind === 'project'
                        ? result.item.summary
                        : result.item.excerpt;
                  return (
                    <button
                      type="button"
                      key={`${result.kind}-${title}`}
                      className={`search-dialog-result ${isActive ? 'is-active' : ''}`}
                      role="option"
                      aria-selected={isActive}
                      data-active={isActive}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => goTo(result)}
                    >
                      <span className="search-dialog-result-icon">
                        <i className={`uil ${group.icon}`} aria-hidden="true" />
                      </span>
                      <span className="search-dialog-result-text">
                        <span className="search-dialog-result-title">{highlight(title, query)}</span>
                        {subtitle ? (
                          <span className="search-dialog-result-subtitle">{highlight(subtitle, query)}</span>
                        ) : null}
                      </span>
                      {result.kind === 'article' ? (
                        <span className="search-dialog-result-meta">{result.item.readingTime}</span>
                      ) : null}
                      <i className="uil uil-corner-down-left search-dialog-result-enter" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="search-dialog-footer">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> {isRtl ? 'ניווט' : 'navigate'}
          </span>
          <span>
            <kbd>↵</kbd> {isRtl ? 'פתיחה' : 'open'}
          </span>
          <span>
            <kbd>esc</kbd> {isRtl ? 'סגירה' : 'close'}
          </span>
        </div>
      </div>
    </div>
  );
}
