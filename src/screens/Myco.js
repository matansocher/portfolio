import '../styles/Myco.scss';

import assets from '../assets';
import { Chip, CircleIcon, Navbar } from '../components';
import config from '../config';

export default function Myco() {
  const { ICONS_MAP } = config;

  return (
    <>
      <Navbar />
      <div className="myco">

        <section className="myco-top" style={{ backgroundImage: `url('${assets.mycoTopBg}')` }}>
          <div className="container">
            <h1>Myco</h1>
            <p>Myco is a social community based on cultural creation, ecological and spiritual views.<br />The community is mostly funded from member fees and selling tickets to events organized for community members / the organization itself.</p>
            <p>I’ve been asked to create two mobile apps:<br />
            1. Ticket purchase app for Events<br />
            2. Producers - Management of events & tickets sales</p>
          </div>
        </section>

        <section className="myco-pas">
          <div className="content">
            <div className="content-left">
              <h2>Problem</h2>
              <p>The HR coordinators were tasked with a labor-intensive process of reviewing manually the monthly attendance cards for most Sanitation employees. They had to meticulously check for instances of overtime and then calculate the compensation for those extra hours worked, based on a complex set of salary agreements. This was a tiring, time consuming & ineffective process, prone to mistakes.</p>
              <h2>Solution</h2>
              <p>The project was divided into two components: one focused on ticket purchasing for users and the other on overall event administration.</p>
              <ul>
                <li>Redesign of the website (mobile)</li>
                <li>Producers app</li>
              </ul>
            </div>
            <div className="content-right">
              <img alt="design system example" src={assets.mycoPassRight} />
            </div>
          </div>
        </section>

        <section className="myco-design-process">
          <div className="content">
            <h2>Design Process</h2>
            <div className="content-content">
              <CircleIcon backgroundColor={'rgba(255, 137, 6, 0.1)'} text={'Research'} icon={ICONS_MAP.SEARCH} iconColor={'#FF8A06'} />
              <CircleIcon backgroundColor={'rgba(255, 137, 6, 0.1)'} text={'Define & Ideate'} icon={ICONS_MAP.LIGHTBULB} iconColor={'#FF8A06'} />
              <CircleIcon backgroundColor={'rgba(255, 137, 6, 0.1)'} text={'Design & Develop'} icon={ICONS_MAP.BRACKETS} iconColor={'#FF8A06'} />
            </div>
          </div>
        </section>

        <section className="myco-user-interviews">
          <div className="content">
            <div className="content-left">
              <Chip text={'Research'} backgroundColor={'#FFF4E7'} icon={ICONS_MAP.SEARCH} />
              <h2>User Interviews</h2>
              <p>During the design phase, I held interviews with a stakeholder and an experienced producer familiar with the current system and alternatives, for both the Redesign project and the new Producers app.</p>
              <p>Research questions:</p>
              <ul>
                <li>
                  <img alt="question mark icon" src={assets.mycoUserInterviewsQm} />
                  <p>Can you walk me through a typical project you manage and the steps involved in it?</p>
                </li>
                <li>
                  <img alt="question mark icon" src={assets.mycoUserInterviewsQm} />
                  <p>What are the primary challenges you face with the current system?</p>
                </li>
                <li>
                  <img alt="question mark icon" src={assets.mycoUserInterviewsQm} />
                  <p>What are your thoughts on the alternatives to the current system?</p>
                </li>
                <li>
                  <img alt="question mark icon" src={assets.mycoUserInterviewsQm} />
                  <p>What are the most important aspects you look for in an Event management app?</p>
                </li>
              </ul>
            </div>
            <div className="content-right">
              <img alt="user interviews examples" src={assets.mycoUserInterviews} />
            </div>
          </div>
        </section>

        <section className="myco-benchmarking">
          <div className="content">
            <h2>Benchmarking</h2>
            <p>The website already had a ticket purchase option, but it required an upgrade in terms of User Experience as part of the redesign. I conducted benchmarking of competitors such as Funzing and Chillz, which are websites that sell tickets for events.</p>
            <div className="content-row first">
              <img alt="app screen example" src={assets.mycoBenchmarking1} />
              <img alt="app screen example" src={assets.mycoBenchmarking2} />
              <img alt="app screen example" src={assets.mycoBenchmarking3} />
            </div>
            <div className="content-row second">
              <img alt="app screen example" src={assets.mycoBenchmarking4} />
              <img alt="app screen example" src={assets.mycoBenchmarking5} />
            </div>
          </div>
        </section>

        <section className="myco-convert">
          <div className="content">
            <Chip text={'Define & Ideate'} backgroundColor={'#FFF4E7'} icon={ICONS_MAP.LIGHTBULB} />
            <h2>Convert insights into screens</h2>
            <p>With the aim of enhancing the current process, I engaged in user interviews to gain a deeper understanding of their challenges, pain points, and objectives. Through these discussions, I was able to gather valuable insights that informed the creation of user flows specifically tailored to meet the users' needs.</p>
            <h3>Flow charts</h3>
            <p>The purpose of user flows was to visualize the steps a user takes to achieve a goal and identify any friction points or areas for improvement along the way.</p>
            <img alt="flow chart" src={assets.mycoConvert1} />
            <h3>First sketches</h3>
            <p>Initially, wireframes were created by hand with pencil and paper during the ideation stage to translate requirements into screen layouts.</p>
            <div className="content-side-by-side">
              <img alt="sketch example" src={assets.mycoConvert2} />
              <img alt="sketch example" src={assets.mycoConvert3} />
              <img alt="sketch example" src={assets.mycoConvert4} />
            </div>
          </div>
        </section>

        <section className="myco-wireframes">
          <div className="myco-wireframes-content">
            <h3>Wireframes</h3>
            <img alt="wireframes examples" src={assets.mycoWireframes} />
          </div>
        </section>

        <section className="myco-redesign">
          <div className="content">
            <Chip text={'Design'} backgroundColor={'#FFF4E7'} icon={ICONS_MAP.BRACKETS} />
            <h2>Redesign of Myco app</h2>
            <p>The redesign took into account factors such as the overall look and feel of the product, accessibility, and the needs of the target audience. The end result is a set of redesigned screens that provide a more intuitive, efficient, and enjoyable experience for the users.</p>
          </div>
          <div className="myco-redesign-content">
            <img alt="app screens examples" src={assets.mycoRedesign1} />
          </div>
        </section>

        <section className="myco-producers">
          <div className="content">
            <div className="content-part content-part-center">
              <h2>Producers app</h2>
              <p className="center">The final output would be a polished and cohesive product that provides a high-quality user experience for the producers</p>
            </div>
            <div className="content-part">
              <div className="content-part side-by-side">
                <div className="left">
                  <h3>Main screens</h3>
                  <p>The main screens of the Producers app provide the options to view current and past events, as well as create a new event. When creating a new event, the user has the ability to duplicate an existing one for convenience, as well as other options such as cancelling an event or putting it on hold. These features allow the producers to efficiently manage their events and make changes as needed.</p>
                </div>
                <div className="right">
                  <img alt="app screen example" src={assets.mycoProducers1} />
                  <img alt="app screen example" src={assets.mycoProducers2} />
                </div>
              </div>
            </div>
            <div className="content-part">
              <p>The event management screen provides a centralized location for producers to manage all aspects of their events. It contains several tabs that allow producers to access different sections of event management and ticket sales information. The tabs likely include "General" for general information about the event, as well as "Coupons", "Sale Sources" and "Orders". Each tab provides producers with the necessary tools and information to effectively manage their events and ticket sales, making the event management process efficient and streamlined</p>
            </div>
            <div className="content-images">
              <div className="content-images">
                <img alt="app screen example" src={assets.mycoProducers3} />
                <img alt="app screen example" src={assets.mycoProducers4} />
                <img alt="app screen example" src={assets.mycoProducers5} />
                <img alt="app screen example" src={assets.mycoProducers6} />
              </div>
            </div>
          </div>
        </section>

        <section className="myco-thoughts">
          <div className="content">
            <div className="content-left">
              <h2>Final thoughts</h2>
              <p>In conclusion, the Producers app provides a comprehensive and user-friendly solution for managing events and ticket sales. With its main screens offering options to view events, create new events with ease, as well as various aspects of event management and ticket sales, the app helps producers to effectively manage their events and ensure a smooth ticketing process for their customers.</p>
              <p>The redesign of the screens and the development of the app reflect a deep understanding of the producers' needs and goals, and the final product is a testament to the effectiveness of user-centered design.</p>
            </div>
            <div className="content-right">
              <img alt="illustration of a happy man using the app" src={assets.mycoThoughts1} />
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
