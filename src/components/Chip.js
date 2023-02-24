import '../styles/Chip.scss';
import config from '../config';

export default function Chip(props) {
  const { ICONS_MAP } = config;

  const {
    backgroundColor,
    textColor = '#151B21',
    text = '',
    icon = ICONS_MAP.SEARCH,
    iconColor = '#000000',
    // size = 18,
  } = props;

  return (
    <div className="chip" style={{ backgroundColor }}>
      {icon && <i class={`uil uil-${icon}`} style={{ color: iconColor }}></i>}
      <p className="text" style={{ color: textColor }}>{text}</p>
    </div>
  );
}
