import '../styles/ContactForm.scss';
import axios from 'axios';
import config from '../config';
import { useRef, useState } from 'react';

export default function ContactForm() {

  const [showErrorText, setShowErrorText] = useState(false);
  const [showSuccessText, setShowSuccessText] = useState(false);

  const nameRef = useRef('');
  const emailRef = useRef('');
  const textRef = useRef('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowSuccessText(false);
    setShowErrorText(false);

    const body = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      text: textRef.current.value,
    };

    try {
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
        <input type="email" ref={emailRef} placeholder="myemail@mail.com" />
      </div>
      <div className="form-element">
        <label>Something you want to ask / say</label>
        <textarea ref={textRef} rows="6" placeholder="Just a fellow salsa dancer saying hi:)" />
      </div>
      <button type="submit" className="green-btn">Submit</button>
      {showErrorText && <p className="error-text">error</p>}
      {showSuccessText && <p className="success-text">success</p>}
    </form>
  );
}
