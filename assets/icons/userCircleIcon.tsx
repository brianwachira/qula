import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const UserCircleIcon = (props: SvgProps) => (
  <Svg
    width={29}
    height={29}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M26.1 14.5c0 6.407-5.194 11.6-11.6 11.6S2.9 20.906 2.9 14.5 8.094 2.9 14.5 2.9c6.407 0 11.6 5.194 11.6 11.6Zm-8.7-4.35a2.9 2.9 0 1 1-5.8 0 2.9 2.9 0 0 1 5.8 0Zm-2.9 5.8a7.251 7.251 0 0 0-6.592 4.228A8.68 8.68 0 0 0 14.5 23.2a8.68 8.68 0 0 0 6.592-3.022A7.251 7.251 0 0 0 14.5 15.95Z"
      fill="#ADADAF"
    />
  </Svg>
);

export default UserCircleIcon;
