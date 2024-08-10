import { Progress } from 'antd';
import './styles/PercentageCircle.scss';

export default function PercentageCircle(props) {

  const {
    percent,
    text = '',
    circleColors = ['#D9F8FF'],
    textColor,
    emptyCircleColor = '#d6d6d6',
    size = 150,
    strokeWidth = 7,
  } = props;


  // const getColorsObj = (circleColors) => {
  //     return {
  //         '0%': circleColors[0],
  //         '100%': circleColors[1],
  //     }
  // }

  return (
    <div className="percentage-circle">
      <div className="circle">
        <Progress
            size={size}
            type="circle"
            percent={percent}
            strokeWidth={strokeWidth}
            strokeColor={circleColors[0]}
            trailColor={emptyCircleColor}
            strokeLinecap="round"/>
        {/*<Progress*/}
        {/*    size={size}*/}
        {/*    type="circle"*/}
        {/*    percent={percent}*/}
        {/*    strokeWidth={strokeWidth}*/}
        {/*    strokeColor={getColorsObj(circleColors)}*/}
        {/*    trailColor={emptyCircleColor}*/}
        {/*    strokeLinecap="round"/>*/}
      </div>
      <p className="text" style={{ color: textColor }}>{text}</p>
    </div>
  );
}
