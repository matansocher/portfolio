import './Navbar.scss';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="home-container-top">
      <Link to="/" style={{ textDecoration: 'none' }}>Dekel</Link>
    </header>
  );
}
