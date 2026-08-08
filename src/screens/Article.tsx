import './styles/Article.scss';
import { Link, useParams } from 'react-router-dom';
import { SiteNav } from '../components';
import articles from '../data/articles';
import type { ArticleBlock } from '../types';

function renderBlock(block: ArticleBlock, index: number) {
  switch (block.type) {
    case 'heading':
      return <h2 key={index}>{block.text}</h2>;
    case 'quote':
      return <blockquote key={index}>{block.text}</blockquote>;
    case 'list':
      return (
        <ul key={index}>
          {block.items?.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case 'paragraph':
    default:
      return <p key={index}>{block.text}</p>;
  }
}

export default function Article() {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);

  return (
    <>
      <SiteNav />
      <main className="article page">
        {article ? (
          <>
            <div className="article-hero">
              <div className="container">
                <Link to="/articles" className="article-back">
                  <i className="uil uil-arrow-left" aria-hidden="true" />
                  All articles
                </Link>
                <div className="article-meta">
                  <span>{article.date}</span>
                  <span className="dot" aria-hidden="true">
                    •
                  </span>
                  <span>{article.readingTime}</span>
                </div>
                <h1>{article.title}</h1>
                <div className="article-tags">
                  {article.tags.map((tag) => (
                    <span key={tag} className="article-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <article className="article-body">
              <div className="container">{article.body.map(renderBlock)}</div>
            </article>
          </>
        ) : (
          <section className="article-missing">
            <div className="container">
              <h1>Article not found</h1>
              <p>The article you are looking for does not exist or may have moved.</p>
              <Link to="/articles" className="article-missing-link">
                Back to all articles
              </Link>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
