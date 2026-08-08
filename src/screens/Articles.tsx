import './styles/Articles.scss';
import { Link } from 'react-router-dom';
import { SiteNav } from '../components';
import articles from '../data/articles';

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
                  <div className="article-card-meta">
                    <span>{article.date}</span>
                    <span className="dot" aria-hidden="true">
                      •
                    </span>
                    <span>{article.readingTime}</span>
                  </div>
                  <h2>{article.title}</h2>
                  <p>{article.excerpt}</p>
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
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
