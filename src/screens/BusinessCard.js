import { animateScroll as scroll } from 'react-scroll';
import '../styles/BusinessCard.scss';
import assets from '../assets';
import config from '../config';
import { Client, Logos, ContactForm, Navbar } from '../components';

export default function BusinessCard() {

  const scrollToForm = () => {
    scroll.scrollToBottom();
  }

  const onMarketerClick = () => {
    window.open(config.MARKETER_URL, '_blank');
  }

  return (
    <>
      <Navbar isCardNav={true} scrollToForm={scrollToForm} isWhiteText={true} />
      <div className="business-card">

        <section className="business-card-top">
          <div className="container">
            <h1>Finding solutions for your challenges</h1>
            <button className="green-btn" onClick={scrollToForm}>Let's Talk</button>
          </div>
        </section>

        <section className="business-card-icons">
          <Logos />
        </section>

        <section className="business-card-who-am-i">
          <div className="content">
            <div className="content-left">
              <img alt="Dekel" src={assets.dekel} />
            </div>
            <div className="content-right">
              <h3>Who am I?</h3>
              <p>I’m Dekel, freelance UX designer.<br />With 4 years of experience in complex systems, for both Desktop & Mobile.<br />I like coming up with solutions to all sort of problems, and provide the best fit for my clients needs.</p>
            </div>
          </div>
        </section>

        <section className="business-card-services">
          <div className="content">
            <h3>My Services</h3>
            <div className="content-services">
              <p>UX / UI</p>
              <p>Product Strategy</p>
              <p>Web Design</p>
              <p>Figma training<br />& best practice</p>
            </div>
          </div>
        </section>

        <section className="business-card-project marketer">
          <img alt="marketer screen examples" src={assets.cardMarketerImage} />
          <div className="content">
            <h3>Marketer</h3>
            <p>As the first Product Designer, I created Design system for a new startup for Marketing management system.</p>
            <button onClick={onMarketerClick}>Go to website</button>
          </div>
        </section>

        <section className="business-card-project myco">
          <img alt="myco screen example" src={assets.cardMycoImage} />
          <div className="content">
            <h3>Myco</h3>
            <p>As the first Product Designer, I created Design system for a new startup for Marketing management system.</p>
          </div>
        </section>

        <section className="business-card-project salaries">
          <img alt="salaries screen examples" src={assets.cardSalariesImage} />
          <div className="content">
            <h3>Salary Additions</h3>
            <p>As the first Product Designer, I created Design system for a new startup for Marketing management system.</p>
          </div>
        </section>

        <section className="business-card-project employees">
          <img alt="employees screen examples" src={assets.cardEmployeesImage} />
          <div className="content">
            <h3>Employee Onboarding page</h3>
            <p>As the first Product Designer, I created Design system for a new startup for Marketing management system.</p>
          </div>
        </section>

        <section className="business-card-clients">
          <div className="content">
            <h4>What clients say</h4>
            {config.CLIENTS_DATA.map(clientData => {
                return <Client key={clientData.name} clientData={clientData} />
            })}
          </div>
        </section>

        <section className="business-card-contact">
          <div className="content">
            <div className="form-wrapper">
              <h4>Let’s talk</h4>
              <p>About your business, or a problem you want to solve.<br />You can even just say hi - I like to meet new people</p>
              <ContactForm />
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
