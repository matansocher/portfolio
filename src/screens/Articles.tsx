import './styles/Articles.scss';
import { Link } from 'react-router-dom';
import { LanguageToggle, SiteNav } from '../components';
import useArticleLanguage from '../hooks/useArticleLanguage';
import articles from '../data/articles';
import assets from '../assets';

export default function Articles() {
  const [language] = useArticleLanguage();
  const isRtl = language === 'he';

  return (
    <>
      <SiteNav />
      <main id="content" className="articles page">
        <section className="articles-header">
          <div className="container">
            <div className="articles-header-top">
              <p className="articles-eyebrow">Writing</p>
              <LanguageToggle />
            </div>
            <h1>Articles</h1>
            <p className="articles-lead">
              Notes on UX research, product design, and building interfaces people trust. Practical thinking from real
              projects, not theory.
            </p>
          </div>
        </section>

        <section className="articles-list-section">
          <div className="container">
            <div className="articles-list" dir={isRtl ? 'rtl' : 'ltr'}>
              {articles.map((article) => {
                const content = article[language];
                return (
                  <Link key={article.slug} to={`/articles/${article.slug}`} className="article-card">
                    {assets[article.image] ? (
                      <div className="article-card-image">
                        <img src={assets[article.image]} alt={content.title} loading="lazy" />
                      </div>
                    ) : null}
                    <div className="article-card-body">
                      <div className="article-card-meta">
                        <span>{content.displayDate}</span>
                        <span className="dot" aria-hidden="true">
                          •
                        </span>
                        <span>{content.readingTime}</span>
                      </div>
                      <h2>{content.title}</h2>
                      <p>{content.excerpt}</p>
                      <div className="article-card-tags">
                        {article.tags.map((tag) => (
                          <span key={tag} className="article-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="article-card-link">
                        {isRtl ? 'קראו את המאמר' : 'Read article'}
                        <i className={isRtl ? 'uil uil-arrow-left' : 'uil uil-arrow-right'} aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
