// import { Progress } from 'antd';
import './styles/PercentageCircle.scss';

export default function PercentageCircle(props) {

  const {
    percent,
    text = '',
    circleColor,
    textColor,
    innerCircleColor = '#d6d6d6',
    size = 150,
    strokeWidth = 7,
  } = props;

  const circleSize = 70;
  const percentToShow = percent >= 70 ? percent - 2 : percent;
  const strokeDashoffset = `calc(440 - (440 * ${percentToShow}) / 100)`;

  // const getColorsObj = (circleColors) => {
  //     return {
  //         '0%': circleColors[0],
  //         '100%': circleColors[1],
  //     }
  // }

  return (
    <div className="percentage-circle">
      <div className="circle">
        <svg>
          <circle cx={circleSize} cy={circleSize} r={circleSize} style={{stroke: innerCircleColor}}></circle>
          <circle cx={circleSize} cy={circleSize} r={circleSize}
                  style={{stroke: circleColor, strokeDashoffset}}></circle>
        </svg>
        <div className="number" style={{color: textColor}}>
          <p style={{color: textColor}}>{percent}%</p>
        </div>
        {/*<Progress*/}
        {/*    size={size}*/}
        {/*    format={percent => <span style={{ color: textColor, fontWeight: 600 }}>{`${percent}%`}</span>}*/}
        {/*    type="circle"*/}
        {/*    percent={percent}*/}
        {/*    strokeWidth={strokeWidth}*/}
        {/*    strokeColor={circleColors[0]}*/}
        {/*    trailColor={innerCircleColor}*/}
        {/*    strokeLinecap="round"/>*/}
      </div>
      <p className="text" style={{ color: textColor }}>{text}</p>
    </div>
  );
}
