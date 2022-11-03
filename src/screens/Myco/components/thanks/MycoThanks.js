import './MycoThanks.scss';
import assets from '../../../../assets';

export default function MycoThanks() {
  return (
    <section className="thanks-container">
      <div className="content thanks-section">
        <h2>Thank you</h2>
        <img src={assets.mycoThanks} alt="screen example" />
      </div>
    </section>
  );
}
