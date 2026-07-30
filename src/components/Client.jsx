import './styles/Client.scss';

export default function Client({ clientData }) {
  return (
    <div className="clients-item">
      <span className="quote quote-1">“</span>
      <span className="quote quote-2">“</span>
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
