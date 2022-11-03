import './MarketistExamples.scss';
import assets from '../../../../assets';

export default function MarketistExamples() {
  return (
    <section className="marketist-examples-container content">
      <div className="marketist-examples-container-box">
        <div className="marketist-examples-container-box-image">
          <img alt="marketist app screen" src={assets.marketistExamples1} />
        </div>
        <div className="marketist-examples-container-box-image">
          <img alt="marketist app screen" src={assets.marketistExamples2} />
        </div>
      </div>
      <div className="marketist-examples-container-box">
        <div className="marketist-examples-container-box-image">
          <img alt="marketist app screen" src={assets.marketistExamples3} />
        </div>
        <div className="marketist-examples-container-box-image">
          <img alt="marketist app screen" src={assets.marketistExamples4} />
        </div>
      </div>
      <div className="marketist-examples-container-box">
        <div className="marketist-examples-container-box-image">
          <img alt="marketist app screen" src={assets.marketistExamples5} />
        </div>
        <div className="marketist-examples-container-box-image">
          <img alt="marketist app screen" src={assets.marketistExamples6} />
        </div>
      </div>
      <div className="marketist-examples-container-box">
        <div className="marketist-examples-container-box-image">
          <img alt="marketist app screen" src={assets.marketistExamples7} />
        </div>
        <div className="marketist-examples-container-box-image">
          <img alt="marketist app screen" src={assets.marketistExamples8} />
        </div>
      </div>
    </section>
  );
}
