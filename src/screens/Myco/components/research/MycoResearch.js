import './MycoResearch.scss';
import assets from '../../../../assets';

export default function MycoResearch() {
  return (
    <section className="myco-research-container">
      <div className="content myco-research-section">
        <div className="myco-research-section-content">
          <div className="myco-research-section-content-left">
            <h3>Research & Benchmarking</h3>
            <p>Ticket purchase option already existed in the website, but needed an upgrade on User Experience level as a part of the redesign.<br></br>I preformed a small research, consisting of user interviews and competitors benchmarking. The competitors I reviewed were other sites selling tickets for events, like Funzing.</p>
          </div>
          <div className="myco-research-section-content-right">
            <div className="myco-research-section-content-right-item">
              <img src={assets.mycoResearch1} alt="screen example" />
              <img src={assets.mycoResearch2} alt="screen example" />
            </div>
            <div className="myco-research-section-content-right-item">
              <img src={assets.mycoResearch3} alt="screen example" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
