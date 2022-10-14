import './MycoThanks.scss';
import { mycoThanks } from '../../../../assets/myco';

export default function MycoThanks() {
  return (
    <section className="thanks-container">
      <div className="content thanks-section">
        <h2>Thank you</h2>
        <img src={mycoThanks} alt="screen examples" />
      </div>
    </section>
  );
}
