import './MycoResearch.scss';
import { mycoResearch1, mycoResearch2, mycoResearch3, mycoResearch4 } from '../../../../assets/myco';

export default function MycoResearch() {
  return (
    <section className="research-container">
      <div className="content research-section">
        <div className="research-section-top">
          <div className="research-section-top-left">
            <h3>Research & Benchmarking</h3>
            <p>Ticket purchase option already existed in the website, but needed an upgrade on User Experience level as a part of the redesign.<br></br>I preformed a small research, consisting of user interviews and competitors benchmarking. The competitors I reviewed were other sites selling tickets for events, like Funzing.</p>
          </div>
          <div className="research-section-top-right">
            <div className="research-section-top-right-item">
              <img src={mycoResearch1} alt="screen example" />
              <img src={mycoResearch2} alt="screen example" />
            </div>
            <div className="research-section-top-right-item">
              <img src={mycoResearch3} alt="screen example" />
            </div>
          </div>
        </div>
        <div className="research-section-middle">
          <div className="research-section-middle-left">
            <h3>Wireframes & User Flows</h3>
          </div>
          <div className="research-section-middle-right">
            <p>In order to understand the current process and try to come up with improvements, I conducted interviews and talked to two experienced users. I tried to discover their challenges, pain points and goals to acheive.<br />From these insights, I created user flows designed to better support the users needs. </p>
          </div>
        </div>
        <div className="research-section-bottom">
          <img src={mycoResearch4} alt="flow chart" />
        </div>
      </div>
    </section>
  );
}
