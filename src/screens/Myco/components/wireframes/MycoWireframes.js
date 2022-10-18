import './MycoWireframes.scss';
import { mycoUserFlows1, mycoUserFlows2, mycoWireframes1, mycoWireframes2, mycoWireframes3, mycoWireframes4 } from '../../../../assets/myco';

export default function MycoWireframes() {
  return (
    <section className="myco-wireframes-container">
      <div className="content myco-wireframes-section">
        <div className="myco-wireframes-section-top">
          <div className="myco-wireframes-section-top-left">
            <h3>Wireframes &<br></br>User Flows</h3>
          </div>
          <div className="myco-wireframes-section-top-right">
            <p>In order to understand the current process and try to come up with improvements, I conducted interviews and talked to two experienced users. I tried to discover their challenges, pain points and goals to acheive.<br />From these insights, I created user flows designed to better support the users needs. </p>
          </div>
        </div>
        <div className="myco-wireframes-section-flows">
          <h4>User Flows</h4>
          <div className="myco-wireframes-section-flows-content">
            <div className="myco-wireframes-section-flows-content-left">
              <p>Cancel & Receive Refund</p>
              <img src={mycoUserFlows1} alt="user flow" />
            </div>
            <div className="myco-wireframes-section-flows-content-right">
              <p>Purchase Tickets</p>
              <img src={mycoUserFlows2} alt="user flow" />
            </div>
          </div>
        </div>
        <div className="myco-wireframes-section-wireframes">
          <h3>Wireframes</h3>
          <div className="myco-wireframes-section-wireframes-box">
            <img src={mycoWireframes1} alt="wireframes" />
            <img src={mycoWireframes2} alt="wireframes" />
            <img src={mycoWireframes3} alt="wireframes" />
            <img src={mycoWireframes4} alt="wireframes" />
          </div>
        </div>
      </div>
    </section>
  );
}
