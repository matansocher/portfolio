import './styles/LanguageToggle.scss';
import useArticleLanguage from '../hooks/useArticleLanguage';

export default function LanguageToggle() {
  const [language, setLanguage] = useArticleLanguage();

  return (
    <div className="language-toggle" role="group" aria-label="Article language">
      <button
        type="button"
        className={language === 'en' ? 'is-active' : ''}
        aria-pressed={language === 'en'}
        onClick={() => setLanguage('en')}
      >
        <span className="language-toggle-flag" aria-hidden="true">
          <svg viewBox="0 0 24 16" width="24" height="16">
            <rect width="24" height="16" fill="#b22234" />
            <g fill="#fff">
              <rect y="1.23" width="24" height="1.23" />
              <rect y="3.69" width="24" height="1.23" />
              <rect y="6.15" width="24" height="1.23" />
              <rect y="8.62" width="24" height="1.23" />
              <rect y="11.08" width="24" height="1.23" />
              <rect y="13.54" width="24" height="1.23" />
            </g>
            <rect width="9.6" height="8.62" fill="#3c3b6e" />
          </svg>
        </span>
        English
      </button>
      <button
        type="button"
        className={language === 'he' ? 'is-active' : ''}
        aria-pressed={language === 'he'}
        onClick={() => setLanguage('he')}
      >
        <span className="language-toggle-flag" aria-hidden="true">
          <svg viewBox="0 0 24 16" width="24" height="16">
            <rect width="24" height="16" fill="#fff" />
            <rect y="1.6" width="24" height="2" fill="#0038b8" />
            <rect y="12.4" width="24" height="2" fill="#0038b8" />
            <path d="M12 5.1l1.8 3.1h-3.6zM12 10.9l-1.8-3.1h3.6z" fill="none" stroke="#0038b8" strokeWidth="0.7" />
          </svg>
        </span>
        עברית
      </button>
    </div>
  );
}
