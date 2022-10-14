import './MarketistSystem.scss';
import { marketistSystem1, marketistSystem2, marketistSystem3 } from '../../../../assets/marketist';

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
          <img alt="marketist app colors" src={marketistSystem1} />
        </div>
      </div>

      <div className="marketist-system-container-item">
        <div className="marketist-system-container-item-left">
          <p>Buttons</p>
        </div>
        <div className="marketist-system-container-item-right">
          <img alt="marketist app buttons" src={marketistSystem2} />
        </div>
      </div>

      <div className="marketist-system-container-item">
        <div className="marketist-system-container-item-left">
          <p>Typography</p>
        </div>
        <div className="marketist-system-container-item-right">
          <img alt="marketist app typography" src={marketistSystem3} />
        </div>
      </div>

    </section>
  );
}
