import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const SearchIcon = (props: SvgProps) => (
  <Svg
    viewBox="0 0 29 29"
    width={29}
    height={29}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.6 5.8a5.8 5.8 0 1 0 0 11.6 5.8 5.8 0 0 0 0-11.6Zm-8.7 5.8a8.7 8.7 0 1 1 15.792 5.041l6.983 6.984a1.45 1.45 0 0 1-2.05 2.05l-6.984-6.983A8.7 8.7 0 0 1 2.9 11.6Z"
      fill="#111827"
    />
  </Svg>
);

export default SearchIcon;
