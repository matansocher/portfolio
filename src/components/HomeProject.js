import './styles/HomeProjects.scss';

export default function HomeProject(props) {
  const {
    name,
    header,
    text,
    sideImage,
    darkText = false,
    backgroundImage,
  } = props;

  return (
    <div className={`content-item ${`project-${name}`}`} style={{ backgroundImage: backgroundImage ? `url('${backgroundImage}')` : '' }}>
      <div className="content-item-content">
        {header && <h2 className={ darkText ? 'dark-header': '' }>{header}</h2>}
        {text && <p>{text}</p>}
      </div>
      {sideImage && <img className="content-item-image" alt="screen example" src={sideImage} />}
    </div>
  );
}
