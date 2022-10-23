import './HomeMain.scss';
import assets from '../../../../assets';

export default function SalariesFlow() {
  return (
    <section className="home-container">
      <img className="bg" alt="background" src={assets.homeMainBg} />
      <div className="home-container-content">
        <div className="home-container-content-left">
          <div className="home-container-content-left-content">
            <p>Hey!</p>
            <p>I’m Dekel, UX/UI Designer</p>
            <p>I specialize in complex systems, and aspire to add value wherever I can.</p>
          </div>
        </div>
        
        <div className="home-container-content-right">
          <div className="elipse"></div>
          <p>Fun facts about me:</p>
          <div className="home-container-content-right-fact">
            <img alt="onion emoji" src={assets.onionEmoji} />
            <p>I am an extremly picky eater</p>
          </div>

          <div className="home-container-content-right-fact">
            <img alt="loudly crying face emoji" src={assets.womanDancingEmoji} />
            <p>I love latin music</p>
          </div>

          <div className="home-container-content-right-fact">
            <img alt="face holding back tears emoji" src={assets.faceHoldingBackTearsEmoji} />
            <p>I am known for writing touching letters to people</p>
          </div>

          <div className="home-container-content-right-fact">
            <img alt="woman dancing emoji" src={assets.loudlyCryingFaceEmoji} />
            <p>I painfully bump into furniture every other week</p>
          </div>

        </div>
      </div>
    </section>
  );
}
