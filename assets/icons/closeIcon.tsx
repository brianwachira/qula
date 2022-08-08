import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const CloseIcon = (props: SvgProps) => (
  <Svg
    width={29}
    height={29}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.225 6.225a1.45 1.45 0 0 1 2.05 0l6.225 6.224 6.225-6.224a1.45 1.45 0 0 1 2.05 2.05L16.551 14.5l6.224 6.225a1.45 1.45 0 0 1-2.05 2.05L14.5 16.551l-6.225 6.224a1.45 1.45 0 1 1-2.05-2.05l6.224-6.225-6.224-6.225a1.45 1.45 0 0 1 0-2.05Z"
      fill="#111827"
    />
  </Svg>
);

export default CloseIcon;
