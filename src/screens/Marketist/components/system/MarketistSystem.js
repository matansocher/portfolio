import './MarketistSystem.scss';
import assets from '../../../../assets';

export default function MarketistSystem() {
  return (
    <section className="marketist-system-container content">
      <h2>Design system</h2>
      <p>The UI was planned to be clean & minimalistic and support the concept of an all-in-one place to manage & track the organization’s marketing operations.</p>

      <div className="marketist-system-container-item">
        <div className="marketist-system-container-item-left">
          <p>Colors</p>
        </div>
        <div className="marketist-system-container-item-right">
          <img alt="marketist app colors" src={assets.marketistSystem1} />
        </div>
      </div>

      <div className="marketist-system-container-item">
        <div className="marketist-system-container-item-left">
          <p>Buttons</p>
        </div>
        <div className="marketist-system-container-item-right">
          <img alt="marketist app buttons" src={assets.marketistSystem2} />
        </div>
      </div>

      <div className="marketist-system-container-item">
        <div className="marketist-system-container-item-left">
          <p>Typography</p>
        </div>
        <div className="marketist-system-container-item-right">
          <img alt="marketist app typography" src={assets.marketistSystem3} />
        </div>
      </div>

    </section>
  );
}
