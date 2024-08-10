import './styles/HomeProjects.scss';

export default function HomeProject(props) {
  const {
    name,
    header,
    text,
    sideImage,
  } = props;

  return (
    <div className={`content-item ${`project-${name}`}`}>
      <div className="content-item-content">
        {header && <h2>{header}</h2>}
        {text && <p>{text}</p>}
      </div>
      {sideImage && <img className="content-item-image" alt="screen example" src={sideImage} />}
    </div>
  );
}
