import './styles/Faq.scss';
import { Link } from 'react-router-dom';
import { Faq as FaqSection, Footer, SiteNav, StructuredData } from '../components';
import { faqPageSchema } from '../components/Faq';

export default function Faq() {
  return (
    <>
      <title>FAQ - Dekel Nissim</title>
      <StructuredData data={faqPageSchema} />
      <SiteNav />
      <main id="content" className="contact-page faq-page">
        <section className="cp-hero faq-page-hero">
          <div className="cp-content">
            <span className="cp-mono">Help center</span>
            <h1>Frequently asked questions</h1>
            <p className="cp-lead">
              Common questions about working with Dekel Nissim - services, the kinds of products, and how to get in
              touch. Have something else in mind? <Link to="/business-card">Send a note</Link>.
            </p>
          </div>
        </section>

        <FaqSection hideHeading />
      </main>
      <Footer />
    </>
  );
}
