import './Navbar.scss';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <header className={pathname === '/' || pathname === '/about' ? '' : 'fixed'}>
      <div className="header-content">
        <div className="header-content-left">
          <Link to="/" style={{ textDecoration: 'none' }}>Dekel</Link>
        </div>
        <div className="header-content-right">
          <Link to="#" onClick={(e) => {window.location.href = 'mailto:dklnsm@gmail.com'; e.preventDefault()} } style={{ textDecoration: 'none' }}>
            dklnsm@gmail.com
          </Link>
        </div>
      </div>
    </header>
  );
}
