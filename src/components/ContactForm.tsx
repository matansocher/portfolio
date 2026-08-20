import './styles/ContactForm.scss';
import axios from 'axios';
import config from '../config';
import { useRef, useState, type FormEvent } from 'react';

export default function ContactForm() {
  const [showErrorText, setShowErrorText] = useState(false);
  const [showSuccessText, setShowSuccessText] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const getFormValues = () => {
    return {
      name: nameRef.current?.value ?? '',
      email: emailRef.current?.value ?? '',
      text: textRef.current?.value ?? '',
    };
  };

  const isFormValid = () => {
    const formValues = getFormValues();
    let isValid = true;
    (Object.keys(formValues) as (keyof typeof formValues)[]).forEach((key) => {
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
      const body = getFormValues();
      await axios.post(`${config.PORTFOLIO_BACKEND}/${config.CONTACT_ENDPOINT}`, body);
      setShowSuccessText(true);
    } catch {
      setShowErrorText(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-element">
        <label htmlFor="contact-name">Your name</label>
        <input id="contact-name" name="name" type="text" autoComplete="name" ref={nameRef} />
      </div>
      <div className="form-element">
        <label htmlFor="contact-email">Your Email</label>
        <input id="contact-email" name="email" type="email" autoComplete="email" ref={emailRef} />
      </div>
      <div className="form-element">
        <label htmlFor="contact-message">Something you want to ask / say</label>
        <textarea
          id="contact-message"
          name="message"
          ref={textRef}
          rows={6}
          placeholder="Just a fellow salsa dancer saying hi:)"
        />
      </div>
      <button type="submit" className="green-btn">
        Submit
      </button>
      {showErrorText && (
        <p className="error-message" role="alert">
          Something went wrong. Please fill in every field and try again.
        </p>
      )}
      {showSuccessText && (
        <p className="success-message" role="status">
          Thanks! Your message has been sent.
        </p>
      )}
    </form>
  );
}
