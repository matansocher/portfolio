import './styles/Article.scss';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { SiteNav } from '../components';
import articles from '../data/articles';
import assets from '../assets';
import type { ArticleLanguage } from '../types';

export default function Article() {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);
  const [language, setLanguage] = useState<ArticleLanguage>('en');

  if (!article) {
    return (
      <>
        <SiteNav />
        <main className="article page">
          <section className="article-missing">
            <div className="container">
              <h1>Article not found</h1>
              <p>The article you are looking for does not exist or may have moved.</p>
              <Link to="/articles" className="article-missing-link">
                Back to all articles
              </Link>
            </div>
          </section>
        </main>
      </>
    );
  }

  const content = article[language];
  const isRtl = language === 'he';
  const image = assets[article.image];

  return (
    <>
      <SiteNav />
      <main className="article page">
        <div className="article-hero">
          <div className="container">
            <div className="article-hero-top">
              <Link to="/articles" className="article-back">
                <i className="uil uil-arrow-left" aria-hidden="true" />
                All articles
              </Link>
              <div className="article-lang" role="group" aria-label="Article language">
                <button
                  type="button"
                  className={language === 'en' ? 'is-active' : ''}
                  aria-pressed={language === 'en'}
                  onClick={() => setLanguage('en')}
                >
                  <span className="article-lang-flag" aria-hidden="true">
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
                  <span className="article-lang-flag" aria-hidden="true">
                    <svg viewBox="0 0 24 16" width="24" height="16">
                      <rect width="24" height="16" fill="#fff" />
                      <rect y="1.6" width="24" height="2" fill="#0038b8" />
                      <rect y="12.4" width="24" height="2" fill="#0038b8" />
                      <path
                        d="M12 5.1l1.8 3.1h-3.6zM12 10.9l-1.8-3.1h3.6z"
                        fill="none"
                        stroke="#0038b8"
                        strokeWidth="0.7"
                      />
                    </svg>
                  </span>
                  עברית
                </button>
              </div>
            </div>
            <div className="article-meta" dir={isRtl ? 'rtl' : 'ltr'}>
              <span>{article.date}</span>
              <span className="dot" aria-hidden="true">
                •
              </span>
              <span>{content.readingTime}</span>
            </div>
            <h1 dir={isRtl ? 'rtl' : 'ltr'}>{content.title}</h1>
            <div className="article-tags" dir={isRtl ? 'rtl' : 'ltr'}>
              {article.tags.map((tag) => (
                <span key={tag} className="article-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {image ? (
          <div className="article-image">
            <div className="container">
              <img src={image} alt={content.title} />
            </div>
          </div>
        ) : null}

        <article className="article-body" dir={isRtl ? 'rtl' : 'ltr'}>
          <div className="container">
            <ReactMarkdown>{content.markdown}</ReactMarkdown>
          </div>
        </article>
      </main>
    </>
  );
}
