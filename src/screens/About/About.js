import './About.scss';
import assets from '../../assets';

export default function About() {
  return (
    <div className="container">
      <img src={assets.aboutDecoration1} alt ="decoration" className="decoration decoration-1" />
      <img src={assets.aboutDecoration2} alt ="decoration" className="decoration decoration-2" />
      <img src={assets.aboutDecoration3} alt ="decoration" className="decoration decoration-3" />

      <div className="container-content">
        <div className="container-content-left">
          <h2>I started as a PMO & system analyst. I liked understanding people & processes and create new things so much, I read & practiced anything I could in order to become UXUI designer. never stopped ever since.</h2>
          <h3>Skills & tools</h3>
          <p>I have 4 years of experience in research & design, mostly in complex systems. I love creating smart processes, clean aestetics and exploring into the users world to come up with great solutions.<br />I aspire to add value wherever I can.</p>
        </div>
        <div className="container-content-right">
          <p>Fun facts - Bonus</p>
          <ul>
            <li>I am now an amatuer salsa dancer (no love like mine to latin music)</li>
            <li>I not only bump into things, I also forget my bag every week (stupid physical things, why can’t we just log them online yet??)</li>
            <li>A sucker for nicknames, with the most nickless-ness name everrr</li>
            <li>By now I think it’s clear I have a good sense of humor. If it’s funny enough - count me in.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
