import './SalariesReporting.scss';
import { salariesReporting1, salariesReporting2 } from '../../../../assets/salaries';

export default function SalariesReporting() {
  return (
    <section className="reporting-container">
      <div className="content reporting-section">
        <div className="reporting-section-top">
          <div className="reporting-section-top-left">
            <h3>1. Reporting attendance</h3>
            <p>The best solution was to report hours through the existing Sanitation tasks management system. Employees preforms 1-3 tasks each day, which are already managed in this system by work manager. We added fields to the screen, allowing to report, enabling to report start & end time for each task.</p>
          </div>
          <div className="reporting-section-top-right">
            <img src={salariesReporting1} alt="reporting attendance screen" />
          </div>
        </div>
        <div className="reporting-section-bottom">
          <h3>2. Calculate salary additions</h3>
          <div className="reporting-section-bottom-content">
            <div className="reporting-section-bottom-content-left">
              <p>Reports from tasks management system</p>
              <p>Salary additions system creates digital attendance cards</p>
              <p>The system examines each day and calculates any salary addition</p>
              <p>Only days with salary additions appear on the digital card</p>
            </div>
            <div className="reporting-section-bottom-content-right">
              <img src={salariesReporting2} alt="flow chart" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
