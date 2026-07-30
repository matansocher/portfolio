import './styles/HomeProjects.scss';

interface HomeProjectProps {
  name: string;
  header?: string;
  text?: string;
  sideImage?: string;
  darkText?: boolean;
  backgroundImage?: string;
}

export default function HomeProject(props: HomeProjectProps) {
  const { name, header, text, sideImage, darkText = false, backgroundImage } = props;

  return (
    <div
      className={`content-item ${`project-${name}`}`}
      style={{ backgroundImage: backgroundImage ? `url('${backgroundImage}')` : '' }}
    >
      <div className="content-item-content">
        {header && <h2 className={darkText ? 'dark-header' : ''}>{header}</h2>}
        {text && <p>{text}</p>}
      </div>
      {sideImage && <img className="content-item-image" alt="screen example" src={sideImage} />}
    </div>
  );
}
