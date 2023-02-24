import '../styles/PercentageCircle.scss';

export default function PercentageCircle(props) {

  const {
    percent,
    text = '',
    circleColor,
    textColor,
    innerCircleColor = '#f3f3f3',
  } = props;

  const circleSize = 70;
  const percentToShow = percent >= 70 ? percent - 2 : percent;
  const strokeDashoffset = `calc(440 - (440 * ${percentToShow}) / 100)`;
  return (
    <div className="percentage-circle">
      <div className="circle">
        <svg>
          <circle cx={circleSize} cy={circleSize} r={circleSize} style={{ stroke: innerCircleColor }}></circle>
          <circle cx={circleSize} cy={circleSize} r={circleSize} style={{ stroke: circleColor, strokeDashoffset }}></circle>
        </svg>
        <div className="number" style={{ color: textColor }}>
          <p style={{ color: textColor }}>{percent}%</p>
        </div>
      </div>
      <p className="text" style={{ color: textColor }}>{text}</p>
    </div>
  );
}
