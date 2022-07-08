import './MycoMain.scss';
import mycoMainScreen from '../../../assets/myco/myco-main.png';

function MycoMain() {
  return (
    <section className="myco-main-container">
      <div className="content main-section">
        <div className="main-section-top">
          <div className="main-section-top-left">
            <img src={mycoMainScreen} alt="main screen example" />
          </div>
          <div className="main-section-top-right">
            <h1>Myco</h1>
            <p>Myco is a social communiting  gathered around values of cultural creation, ecological and spiritual views.<br />The community is mostly funded from member fees and selling tickets to events organized for community members, or anyone who wants to join.</p>
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

export default MycoMain;
