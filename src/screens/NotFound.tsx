import './styles/NotFound.scss';
import { Link } from 'react-router-dom';
import { SiteNav } from '@/components';

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main className="not-found page">
        <section className="not-found-body">
          <div className="container">
            <h1>Page not found</h1>
            <p>The page you are looking for does not exist or may have moved.</p>
            <Link to="/" className="not-found-link">
              Back to home
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
