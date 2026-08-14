import './styles/Article.scss';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { SiteNav } from '../components';
import useArticleLanguage from '../hooks/useArticleLanguage';
import articles from '../data/articles';
import assets from '../assets';

export default function Article() {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);
  const [language] = useArticleLanguage();

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
            </div>
            <div className="article-meta" dir={isRtl ? 'rtl' : 'ltr'}>
              <span>{content.displayDate}</span>
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
