import './styles/Contact.scss';
import { SiteNav } from '../components';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <>
      <SiteNav />
      <div className="contact-page container">
        <h1>Contact</h1>
        <p>If you'd like to work together, say hi — or use the form below.</p>
        <ContactForm />
      </div>
    </>
  );
}
