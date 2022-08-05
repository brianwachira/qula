import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const HeartIcon = (props: SvgProps) => (
  <Svg
    width={29}
    height={29}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.599 7.499a5.8 5.8 0 0 1 8.202 0L14.5 9.198l1.699-1.7a5.8 5.8 0 1 1 8.202 8.203L14.5 25.602l-9.901-9.9a5.8 5.8 0 0 1 0-8.203Z"
      fill={props.fill}
    />
  </Svg>
);

export default HeartIcon;
