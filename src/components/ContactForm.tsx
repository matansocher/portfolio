import './styles/ContactForm.scss';
import axios from 'axios';
import config from '../config';
import { useRef, useState, type FormEvent } from 'react';

export default function ContactForm() {
  const [showErrorText, setShowErrorText] = useState(false);
  const [showSuccessText, setShowSuccessText] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const companyUrlRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const getFormValues = () => {
    return {
      name: nameRef.current?.value ?? '',
      email: emailRef.current?.value ?? '',
      text: textRef.current?.value ?? '',
      companyUrl: companyUrlRef.current?.value ?? '',
    };
  };

  const isFormValid = () => {
    const formValues = getFormValues();
    let isValid = true;
    (['name', 'email', 'text'] as const).forEach((key) => {
      if (!formValues[key]) {
        isValid = false;
      }
    });
    return isValid;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowSuccessText(false);
    setShowErrorText(false);

    if (!isFormValid()) {
      setShowErrorText(true);
      return;
    }

    try {
      const { name, email, text } = getFormValues();
      await axios.post(`${config.PORTFOLIO_BACKEND}/portfolio/${config.CONTACT_ENDPOINT}`, { name, email, text });
      setShowSuccessText(true);
    } catch {
      setShowErrorText(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-element">
        <label htmlFor="contact-name">Name <span>(required)</span></label>
        <input id="contact-name" type="text" ref={nameRef} />
      </div>

      <div className="form-element">
        <label htmlFor="contact-email">Email <span>(required)</span></label>
        <input id="contact-email" type="email" ref={emailRef} />
      </div>

      <div className="form-element">
        <label htmlFor="contact-company">Company URL</label>
        <input id="contact-company" type="url" ref={companyUrlRef} />
      </div>

      <div className="form-element form-element--message">
        <label htmlFor="contact-message">Message <span>(required)</span></label>
        <textarea
          id="contact-message"
          ref={textRef}
          rows={6}
          placeholder="Please provide more context about the design problems you are facing and the design services you are interested in."
        />
      </div>

      <div className="form-element form-element--captcha">
        <label htmlFor="contact-captcha">Captcha <span>(required)</span></label>
        <div className="contact-form__captcha-wrap">
          <input id="contact-captcha" type="checkbox" />
          <span className="contact-form__captcha-label">I’m not a robot</span>
          <span className="contact-form__captcha-badge">reCAPTCHA</span>
        </div>
      </div>

      <button type="submit" className="contact-form__submit">
        Submit
      </button>

      {showErrorText && <p className="error-message">error</p>}
      {showSuccessText && <p className="success-message">success</p>}
    </form>
  );
}
