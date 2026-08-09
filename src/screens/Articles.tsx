import './styles/Articles.scss';
import { Link } from 'react-router-dom';
import { SiteNav } from '../components';
import articles from '../data/articles';
import assets from '../assets';

export default function Articles() {
  return (
    <>
      <SiteNav />
      <main className="articles page">
        <section className="articles-header">
          <div className="container">
            <p className="articles-eyebrow">Writing</p>
            <h1>Articles</h1>
            <p className="articles-lead">
              Notes on UX research, product design, and building interfaces people trust. Practical thinking from real
              projects, not theory.
            </p>
          </div>
        </section>

        <section className="articles-list-section">
          <div className="content">
            <div className="articles-list">
              {articles.map((article) => (
                <Link key={article.slug} to={`/articles/${article.slug}`} className="article-card">
                  {assets[article.image] ? (
                    <div className="article-card-image">
                      <img src={assets[article.image]} alt={article.en.title} loading="lazy" />
                    </div>
                  ) : null}
                  <div className="article-card-body">
                    <div className="article-card-meta">
                      <span>{article.displayDate}</span>
                      <span className="dot" aria-hidden="true">
                        •
                      </span>
                      <span>{article.en.readingTime}</span>
                    </div>
                    <h2>{article.en.title}</h2>
                    <p>{article.en.excerpt}</p>
                    <div className="article-card-tags">
                      {article.tags.map((tag) => (
                        <span key={tag} className="article-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="article-card-link">
                      Read article
                      <i className="uil uil-arrow-right" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
