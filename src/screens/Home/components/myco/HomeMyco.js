import './HomeMyco.scss';
import { Link } from 'react-router-dom';
import assets from '../../../../assets';

export default function HomeMyco() {
  return (
    <section className="section-container myco-container">
      <div className="section-content">
        <div className="section-content-left">
          <h2>MYCO</h2>
          <p>Events management App</p>
          <div className="tags">
            <span className="tag">UX research</span>
            <span className="tag">UI design</span>
          </div>
          <Link to='/myco'>Take a look</Link>
        </div>
        <div className="section-content-right">
          <img src={assets.homeMyco} alt="screen example" />
        </div>
      </div>
    </section>
  );
}
