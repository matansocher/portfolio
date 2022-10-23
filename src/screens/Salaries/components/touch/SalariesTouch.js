import './SalariesTouch.scss';
import assets from '../../../../assets';

export default function SalariesTouch() {
  return (
    <section className="touch-container">
      <div className="content touch-section">
        <div className="touch-section-content">
          <h3>A touch of UI - <br />Graphic elements & Colour visualization</h3>
          <p>Due to lack of time & resources, we decided to go on a minimalistic design, using mostly on ready components and free icons with minimal customization. This approach also corresponded with the large amount of data displayed in many attendance cards.</p>
          <p>Colour was almost exclusively used to draw attention & emphasize information, such as: card status, type of absence, shortage of counters (such as sick leave, vacation days etc.)</p>
        </div>
        <div className="touch-section-image">
          <img alt="salary calculation screen" src={assets.salariesTouch} />
        </div>
        <div className="touch-section-bottom">
          <h3>Project Outcome - Acheivments</h3>
          <div className="touch-section-bottom-content">
            <div className="touch-section-bottom-content-item">
              <div className="touch-section-bottom-content-item-left">
                <span>98.5%</span>
              </div>
              <div className="touch-section-bottom-content-item-right">
                <p>Success rates in calculations</p>
              </div>
            </div>
            <div className="touch-section-bottom-content-item">
              <div className="touch-section-bottom-content-item-left">
                <span>95%</span>
              </div>
              <div className="touch-section-bottom-content-item-right">
                <p>Of cards approved (on average) by the 10th day of each month</p>
              </div>
            </div>
            <div className="touch-section-bottom-content-item">
              <div className="touch-section-bottom-content-item-left">
                <span>50%</span>
              </div>
              <div className="touch-section-bottom-content-item-right">
                <p>Of cards approved in the first week of each month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
