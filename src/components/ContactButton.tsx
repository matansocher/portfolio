import './styles/ContactButton.scss';
import { Link } from 'react-router-dom';

export default function ContactButton() {
  return (
    <div className="contact-button-wrapper">
      <Link to="/contact" className="contact-button">
        Contact
      </Link>
    </div>
  );
}
