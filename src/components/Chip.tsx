import './styles/Chip.scss';
import config from '../config';

interface ChipProps {
  backgroundColor?: string;
  textColor?: string;
  text?: string;
  icon?: string;
  iconColor?: string;
}

export default function Chip(props: ChipProps) {
  const { ICONS_MAP } = config;

  const { backgroundColor, textColor = '#151B21', text = '', icon = ICONS_MAP.SEARCH, iconColor = '#000000' } = props;

  return (
    <div className="chip" style={{ backgroundColor }}>
      {icon && <i className={`uil uil-${icon}`} style={{ color: iconColor }} aria-hidden="true"></i>}
      <p className="text" style={{ color: textColor }}>
        {text}
      </p>
    </div>
  );
}
