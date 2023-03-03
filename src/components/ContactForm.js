import './styles/ContactForm.scss';
import axios from 'axios';
import config from '../config';
import { useRef, useState } from 'react';

export default function ContactForm() {

  const [showErrorText, setShowErrorText] = useState(false);
  const [showSuccessText, setShowSuccessText] = useState(false);

  const nameRef = useRef('');
  const emailRef = useRef('');
  const textRef = useRef('');

  const getFormValues = () => {
    return {
      name: nameRef.current.value,
      email: emailRef.current.value,
      text: textRef.current.value,
    }
  }

  const isFormValid = () => {
    const formValues = getFormValues();
    let isValid = true;
    Object.keys(formValues).forEach(key => {
      if (!formValues[key]) {
        isValid = false;
      }
    })
    return isValid;
  }

  const handleSubmit = async (event) => {
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
    } catch (e) {
      setShowErrorText(true);
    }
    
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-element">
        <label>Your name</label>
        <input type="text" ref={nameRef} />
      </div>
      <div className="form-element">
        <label>Your Email</label>
        <input type="email" ref={emailRef} />
      </div>
      <div className="form-element">
        <label>Something you want to ask / say</label>
        <textarea ref={textRef} rows="6" placeholder="Just a fellow salsa dancer saying hi:)" />
      </div>
      <button type="submit" className="green-btn">Submit</button>
      {showErrorText && <p className="error-message">error</p>}
      {showSuccessText && <p className="success-message">success</p>}
    </form>
  );
}
