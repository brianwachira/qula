import 'react-native-svg';

// declaration file to add missing props on react-native-svg
declare module 'react-native-svg' {
  export interface SvgProps {
    xmlns?: string;
    xmlnsXlink?: string;
  }
}
