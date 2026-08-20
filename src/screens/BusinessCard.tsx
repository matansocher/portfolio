import './styles/BusinessCard.scss';
import { ContactForm, Faq, Footer, SiteNav } from '../components';

export default function BusinessCard() {
  return (
    <>
      <title>Finding Solutions for your Design Challenges — Dekel Nissim</title>
      <SiteNav />
      <main id="content" className="contact-page">
        <section className="cp-hero">
          <div className="cp-content">
            <div className="cp-grid">
              <div className="cp-intro">
                <span className="cp-mono">Contact</span>
                <h1>Get in touch</h1>
                <p className="cp-lead">
                  Have a complex product decision to move forward, or a UX problem you want a second pair of eyes on?
                  Send a note and I will get back to you.
                </p>
                <ul className="cp-details">
                  <li>
                    <span className="cp-details-label">Email</span>
                    <a href="mailto:dklnsm@gmail.com">dklnsm@gmail.com</a>
                  </li>
                  <li>
                    <span className="cp-details-label">LinkedIn</span>
                    <a href="https://www.linkedin.com/in/dekelnissim/" target="_blank" rel="noopener noreferrer">
                      /in/dekelnissim
                    </a>
                  </li>
                </ul>
              </div>

              <div className="cp-form-card">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <Faq showFaqPageLink />
      </main>
      <Footer />
    </>
  );
}
