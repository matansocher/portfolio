import './HomeSalaries.scss';
import { Link } from 'react-router-dom';
import assets from '../../../../assets';

export default function HomeSalaries() {
  return (
    <section className="section-container salaries-container">
      <div className="section-content">
        <div className="section-content-left">
          <h2>Salary Additions</h2>
          {/* <p>Calculation & management of salary additions</p> */}
          <p>Research & design of a Salary additions system for Sanitation HR department in TLV municipality</p>
          <div className="tags">
            <span className="tag">UX research</span>
            <span className="tag">UI design</span>
          </div>
          <Link to='/salaries'>Take a look</Link>
        </div>
        <div className="section-content-right">
          <img className="regular" src={assets.homeSalaries} alt="salary additions app screen" />
          <img className="mobile" src={assets.homeSalariesMobile} alt="salary additions app screen" />
        </div>
      </div>
    </section>
  );
}
