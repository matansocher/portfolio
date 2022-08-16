import './HomeMain.scss';
import { onionEmoji, loudlyCryingFaceEmoji, faceHoldingBackTearsEmoji, womanDancingEmoji } from '../../../assets/shared';

function SalariesFlow() {
  return (
    <section className="home-container">
      <div className="home-container-content">
        <div className="home-container-content-left">
          <div className="home-container-content-left-content">
            <p>Hey!</p>
            <p>I’m Dekel, UX/UI Designer</p>
            <p>I specialize in complex systems, and aspire to add value wherever I can.</p>
          </div>
        </div>
        
        <div className="home-container-content-right">
          <p>Fun facts about me:</p>
          <div className="home-container-content-right-fact">
            <img alt="onion emoji" src={onionEmoji} />
            <p>I am an extremly picky eater</p>
          </div>

          <div className="home-container-content-right-fact">
            <img alt="loudly crying face emoji" src={loudlyCryingFaceEmoji} />
            <p>I love latin music</p>
          </div>

          <div className="home-container-content-right-fact">
            <img alt="face holding back tears emoji" src={faceHoldingBackTearsEmoji} />
            <p>I am known for writing touching letters to people</p>
          </div>

          <div className="home-container-content-right-fact">
            <img alt="woman dancing emoji" src={womanDancingEmoji} />
            <p>I painfully bump into furniture every other week</p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default SalariesFlow;
