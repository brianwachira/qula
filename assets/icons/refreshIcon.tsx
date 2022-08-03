import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const RefreshIcon = (props: SvgProps) => (
  <Svg
    width={29}
    height={29}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.8 2.9c.8 0 1.45.65 1.45 1.45v3.047A10.118 10.118 0 0 1 14.5 4.35c4.422 0 8.18 2.827 9.572 6.767a1.45 1.45 0 1 1-2.734.966A7.254 7.254 0 0 0 8.699 10.15h4.351a1.45 1.45 0 0 1 0 2.9H5.8c-.8 0-1.45-.65-1.45-1.45V4.35c0-.8.65-1.45 1.45-1.45Zm.012 13.133a1.45 1.45 0 0 1 1.85.884 7.253 7.253 0 0 0 12.639 1.933H15.95a1.45 1.45 0 0 1 0-2.9h7.25a1.45 1.45 0 0 1 1.45 1.45v7.25a1.45 1.45 0 0 1-2.9 0v-3.047a10.118 10.118 0 0 1-7.25 3.047c-4.422 0-8.18-2.826-9.572-6.767a1.45 1.45 0 0 1 .884-1.85Z"
      fill="#ADADAF"
    />
  </Svg>
);

export default RefreshIcon;
