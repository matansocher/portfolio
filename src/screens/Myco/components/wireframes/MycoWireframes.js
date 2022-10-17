import './MycoWireframes.scss';
import { mycoResearch1, mycoResearch2, mycoResearch3, mycoResearch4 } from '../../../../assets/myco';

export default function MycoWireframes() {
  return (
    <section className="myco-wireframes-container">
      <div className="content myco-wireframes-section">
        <div className="myco-wireframes-section-top">
          <div className="myco-wireframes-section-top-left">
            <h3>Wireframes & User Flows</h3>
          </div>
          <div className="myco-wireframes-section-top-right">
            <p>In order to understand the current process and try to come up with improvements, I conducted interviews and talked to two experienced users. I tried to discover their challenges, pain points and goals to acheive.<br />From these insights, I created user flows designed to better support the users needs. </p>
          </div>
        </div>
        <div className="myco-wireframes-section-flows">
          <img src={mycoResearch4} alt="flow chart" />
        </div>
        <div className="myco-wireframes-section-wireframes">
          <img src={mycoResearch4} alt="flow chart" />
        </div>
      </div>
    </section>
  );
}
