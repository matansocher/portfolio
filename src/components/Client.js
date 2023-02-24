import '../styles/Client.scss';
import assets from '../assets';

export default function Client({ clientData }) {
  return (
    <div className="clients-item">
      <img alt="quote" src={assets.quoteGreen} className="quote quote-1" />
      <img alt="quote" src={assets.quoteGreen} className="quote quote-2" />      
      <div className="clients-item-details">
        <p className="text">{clientData.text}</p>
        <div className="clients-item-details-person">
          <p className="name">{clientData.name}</p>
          <div className="clients-item-details-person-additional">
            <span className="title">{clientData.title}</span>
            <span className="company">{clientData.company}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
