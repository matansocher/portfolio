import './MycoSearch.scss';
import { mycoSearch1, mycoSearch2, mycoSearch3, mycoSearch4 } from '../../../../assets/myco';

export default function MycoSearch() {
  return (
    <section className="search-container">
      <div className="content search-section">
        <h2>High Fidelity</h2>
        <div className="search-section-part">
          <div className="search-section-part-left">
            <img src={mycoSearch1} alt="screen example" />
            <img src={mycoSearch2} alt="screen example" />
          </div>
          <div className="search-section-part-right">
            <h4>Search Events Pages</h4>
            <p>Events page is the main page, where users can explore all the existing events or search for a specific event. They can also use filters and see only events that match their criteria.</p>
          </div>
        </div>
        <div className="search-section-part">
          <div className="search-section-part-left">
            <img src={mycoSearch3} alt="screen example" />
            <img src={mycoSearch4} alt="screen example" />
          </div>
          <div className="search-section-part-right">
            <h4>Event Page</h4>
            <p className="big-p">By clicking on an event on the main page, thay get to Event page. This page contains all the details on the event date&time, location, what the event consists etc. There are also detailed texts explaining the meaning and content of the event, and the availability of the different ticket types.<br></br>For immediate purchase of ticket, there is a form that opens up on the page itself allowing to enter personal  and credit card details and get the ticket.<br></br>There is also an option to add the tickets to the shopping cart and pay later.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
