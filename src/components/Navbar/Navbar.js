import './Navbar.scss';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="home-container-top">
      <Link to="/" style={{ textDecoration: 'none' }}>Dekel</Link>
    </header>
  );
}

export default Navbar;
