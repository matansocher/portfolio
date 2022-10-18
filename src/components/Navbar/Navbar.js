import './Navbar.scss';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header>
      <div className="header-left">
        <Link to="/" style={{ textDecoration: 'none' }}>Dekel</Link>
      </div>
      <div className="header-right">
        <Link to="#" onClick={(e) => {window.location.href = 'mailto:dklnsm@gmail.com'; e.preventDefault()} } style={{ textDecoration: 'none' }}>
          dklnsm@gmail.com
        </Link>
      </div>
    </header>
  );
}
