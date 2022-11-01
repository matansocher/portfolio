import './HomeMarketist.scss';
import { Link } from 'react-router-dom';
import assets from '../../../../assets';

export default function HomeMarketist() {
  return (
    <section className="section-container marketist-container">
      <div className="section-content">
        <div className="section-content-left">
          <h2>Marketist</h2>
          <p>Internal marketing management system</p>
          <div className="tags">
            <span className="tag">UI design</span>
          </div>
          <Link to='/marketist'>Take a look</Link>
        </div>
        <div className="section-content-right">
          <img src={assets.homeMarketist} alt="screen example" />
        </div>
      </div>
    </section>
  );
}
