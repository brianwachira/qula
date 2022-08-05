import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const CartIcon = (props: SvgProps) => (
  <Svg
    width={29}
    height={29}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M4.35 1.45a1.45 1.45 0 0 0 0 2.9h1.768l.443 1.772.015.061 1.968 7.872L7.25 15.35C5.423 17.176 6.717 20.3 9.3 20.3h12.45a1.45 1.45 0 0 0 0-2.9H9.3l1.45-1.45h9.55c.55 0 1.051-.31 1.297-.801l4.35-8.7A1.45 1.45 0 0 0 24.65 4.35H9.107l-.45-1.802A1.45 1.45 0 0 0 7.25 1.45h-2.9ZM23.2 23.925a2.175 2.175 0 1 1-4.35 0 2.175 2.175 0 0 1 4.35 0ZM9.425 26.1a2.175 2.175 0 1 0 0-4.35 2.175 2.175 0 0 0 0 4.35Z"
      fill={props.fill}
    />
  </Svg>
);

export default CartIcon;
