import './MycoMain.scss';
import assets from '../../../../assets';

export default function MycoMain() {
  return (
    <section className="myco-main-container">
      <div className="content main-section">
        <div className="main-section-top">
          <div className="main-section-top-left">
            <img src={assets.mycoMain} alt="main screen example" />
          </div>
          <div className="main-section-top-right">
            <h1>MYCO</h1>
            <p>Myco is a social community based on cultural creation, ecological and spiritual views.<br/>The community is mostly funded from member fees and selling tickets to events organized for community members / the organization itself.</p>
            <p>I’ve been asked to create two mobile apps:</p>
            <ol>
              <li>Ticket purchase app for Events</li>
              <li>Producers - Management of events & tickets sales</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
