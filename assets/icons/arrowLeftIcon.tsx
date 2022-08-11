import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const ArrowLeftIcon = (props: SvgProps) => (
  <Svg
    width={25}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.134 20.884a1.25 1.25 0 0 1-1.768 0l-7.5-7.5a1.25 1.25 0 0 1 0-1.768l7.5-7.5a1.25 1.25 0 0 1 1.768 1.768L6.768 11.25H21.25a1.25 1.25 0 1 1 0 2.5H6.768l5.366 5.366a1.25 1.25 0 0 1 0 1.768Z"
      fill="#111827"
    />
  </Svg>
);

export default ArrowLeftIcon;
