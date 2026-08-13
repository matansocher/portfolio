import './styles/Contact.scss';
import { SiteNav } from '../components';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <>
      <SiteNav />
      <main className="contact-page">
        <div className="contact-page__inner">
          <section className="contact-page__content">
            <span className="contact-page__eyebrow">CONTACT US</span>
            <h1>Get in Touch</h1>
            <p>
              Our team of enterprise enthusiasts are happy to help.
              <br />
              Feel free to send us any questions or comments and
              <br />
              we&apos;ll get back to you as soon as possible!
            </p>

            <ul className="contact-page__details">
              <li>
                <a href="https://cal.com" target="_blank" rel="noreferrer">
                  Book a call: <span>30 Minute Consultation</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@pendlandpaper.ca">Email: info@pendlandpaper.ca</a>
              </li>
              <li>
                <a href="tel:2504197636">Phone: 250-419-7636</a>
              </li>
              <li>
                <a href="https://maps.google.com/?q=3+Fan+Tan+Alley+Suite+400+Victoria+BC+V8W+3G9" target="_blank" rel="noreferrer">
                  Address: 3 Fan Tan Alley Suite 400, Victoria, BC, V8W 3G9
                </a>
              </li>
            </ul>
          </section>

          <ContactForm />
        </div>
      </main>
    </>
  );
}
