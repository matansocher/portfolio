import './Footer.scss';
import { Link } from 'react-router-dom';
import { beamingFaceWithSmilingEyesEmoji, mailIcon, brandLinkedinIcon } from '../../assets/shared';

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-content-left">
          <p>Let’s talk! I would love to hear from you</p>
          <img alt="beaming face with smiling eyes emoji" src={beamingFaceWithSmilingEyesEmoji} />
        </div>
        <div className="footer-content-right">
          <ul>
            <li>
              <Link to="//www.linkedin.com/in/dekel-nissim-5a18aa174" style={{ textDecoration: 'none' }}>
                <img alt="brand linkedin icon" src={brandLinkedinIcon} />
              </Link>
            </li>
            <li>
              <Link to="#" onClick={(e) => {window.location.href = 'mailto:dklnsm@gmail.com'; e.preventDefault()} } style={{ textDecoration: 'none' }}>
                <img alt="mail icon" src={mailIcon} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
