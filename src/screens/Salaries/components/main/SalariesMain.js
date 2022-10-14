import './SalariesMain.scss';
import { salariesMainScreen } from '../../../../assets/salaries';

export default function SalariesMain() {
  return (
    <section className="main-container">
      <div className="content main-section">
        <div className="main-section-top">
          <div className="main-section-top-left">
            <h1>Salary Additions System</h1>
          </div>
          <div className="main-section-top-right">
            <p>This web system is a solution my team provided to Sanitation HR department, in order to manage, calculate and approve salary additions for Sanitation employees.
            This solution consists two parts:</p>
            <ol>
              <li>How to report employees attendance in the system</li>
              <li>How to calculate salary additions, to be manually approved by HR</li>
            </ol>
          </div>
        </div>
        <div className="main-section-image">
          <img src={salariesMainScreen} alt="salary additions app screen" />
        </div>
      </div>
    </section>
  );
}
