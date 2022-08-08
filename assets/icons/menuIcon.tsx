import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const MenuIcon = (props: SvgProps) => (
  <Svg
    width={29}
    height={29}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.35 7.25c0-.8.65-1.45 1.45-1.45h17.4a1.45 1.45 0 0 1 0 2.9H5.8c-.8 0-1.45-.65-1.45-1.45ZM4.35 14.5c0-.8.65-1.45 1.45-1.45h17.4a1.45 1.45 0 0 1 0 2.9H5.8c-.8 0-1.45-.65-1.45-1.45ZM4.35 21.75c0-.8.65-1.45 1.45-1.45h17.4a1.45 1.45 0 0 1 0 2.9H5.8c-.8 0-1.45-.65-1.45-1.45Z"
      fill="#111827"
    />
  </Svg>
);

export default MenuIcon;
