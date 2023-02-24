import '../styles/CircleIcon.scss';
import config from '../config';

export default function CircleIcon(props) {
  const { ICONS_MAP } = config;

  const {
    backgroundColor,
    textColor = '#151B21',
    text = '',
    icon = ICONS_MAP.SEARCH,
    width = 175,
    size = 78,
    iconSize = 28,
    iconColor = '#000000',
  } = props;

  return (
    <div className="circle-icon" style={{ width: `${width}px` }}>
      <div className="icon-wrapper" style={{ backgroundColor, width: `${size}px`, height: `${size}px` }}>
        <i class={`uil uil-${icon}`} style={{ color: iconColor, fontSize: `${iconSize}px` }}></i>
      </div>
      {text && <p className="text" style={{ color: textColor }}>{text}</p>}
    </div>
  );
}
