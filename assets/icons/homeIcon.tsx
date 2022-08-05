import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const HomeIcon = (props: SvgProps) => (
  <Svg
    width={29}
    height={29}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M15.525 3.325a1.45 1.45 0 0 0-2.05 0l-10.15 10.15a1.45 1.45 0 1 0 2.05 2.05l.425-.424v9.549c0 .8.65 1.45 1.45 1.45h2.9c.8 0 1.45-.65 1.45-1.45v-2.9c0-.8.65-1.45 1.45-1.45h2.9c.8 0 1.45.65 1.45 1.45v2.9c0 .8.65 1.45 1.45 1.45h2.9c.8 0 1.45-.65 1.45-1.45V15.1l.425.425a1.45 1.45 0 1 0 2.05-2.05l-10.15-10.15Z"
      fill={props.fill}
    />
  </Svg>
);

export default HomeIcon;
