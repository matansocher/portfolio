import './HomeMyco.scss';
import { Link } from 'react-router-dom';
import { homeMyco } from '../../../../assets/home';

export default function HomeMyco() {
  return (
    <section className="section-container myco-container">
      <Link to='/myco' style={{ textDecoration: 'none' }}>
        <div className="section-content">
          <div className="section-content-left">
            <h2>MYCO</h2>
            <p>Events management App</p>
            <div className="tags">
              <span className="tag">UX UI</span>
            </div>
          </div>
          <div className="section-content-right">
            <img src={homeMyco} alt="screen example" />
          </div>
        </div>
      </Link>
    </section>
  );
}
