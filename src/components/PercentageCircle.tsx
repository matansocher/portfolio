import './styles/PercentageCircle.scss';

interface PercentageCircleProps {
  percent: number;
  text?: string;
  circleColor?: string;
  textColor?: string;
  innerCircleColor?: string;
}

export default function PercentageCircle(props: PercentageCircleProps) {
  const { percent, text = '', circleColor, textColor, innerCircleColor = '#d6d6d6' } = props;

  const circleSize = 70;
  const percentToShow = percent >= 70 ? percent - 2 : percent;
  const strokeDashoffset = `calc(440 - (440 * ${percentToShow}) / 100)`;

  return (
    <div className="percentage-circle">
      <div className="circle">
        <svg>
          <circle cx={circleSize} cy={circleSize} r={circleSize} style={{ stroke: innerCircleColor }}></circle>
          <circle
            cx={circleSize}
            cy={circleSize}
            r={circleSize}
            style={{ stroke: circleColor, strokeDashoffset }}
          ></circle>
        </svg>
        <div className="number" style={{ color: textColor }}>
          <p style={{ color: textColor }}>{percent}%</p>
        </div>
      </div>
      <p className="text" style={{ color: textColor }}>
        {text}
      </p>
    </div>
  );
}
