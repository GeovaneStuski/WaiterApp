import { Svg, Path } from 'react-native-svg';
import { Icon } from '../../types/Icon';

export function BellIcon({ color = '#333333', size}: Icon) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path fillRule="evenodd" clipRule="evenodd" d="M6.00005 13.2778V9C6.00005 5.68629 8.68634 3 12 3V3C15.3138 3 18 5.68629 18 9L18 13.2778L19.6339 14.9117C19.8683 15.1461 20 15.464 20 15.7955V16.25C20 16.9404 19.4404 17.5 18.75 17.5H5.25C4.55964 17.5 4 16.9404 4 16.25V15.7955C4 15.464 4.1317 15.1461 4.36612 14.9117L6.00005 13.2778Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M14 20.25C12.8542 21.25 11.1458 21.25 10 20.25" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
}