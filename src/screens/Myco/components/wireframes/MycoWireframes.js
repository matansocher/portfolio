import './MycoWireframes.scss';
import assets from '../../../../assets';

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
          <div className="myco-wireframes-section-flows-content">
            <div className="myco-wireframes-section-flows-content-left">
              <p>Cancel & Receive Refund</p>
              <img src={assets.mycoUserFlows1} alt="user flow" />
            </div>
            <div className="myco-wireframes-section-flows-content-right">
              <p>Purchase Tickets</p>
              <img src={assets.mycoUserFlows2} alt="user flow" />
            </div>
          </div>
        </div>
        <div className="myco-wireframes-section-wireframes">
          <h3>Wireframes</h3>
          <div className="myco-wireframes-section-wireframes-box">
            <img src={assets.mycoWireframes1} alt="wireframes" />
            <img src={assets.mycoWireframes2} alt="wireframes" />
            <img src={assets.mycoWireframes3} alt="wireframes" />
            <img src={assets.mycoWireframes4} alt="wireframes" />
          </div>
        </div>
      </div>
    </section>
  );
}
