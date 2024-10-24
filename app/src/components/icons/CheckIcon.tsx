import Svg, { Path } from 'react-native-svg';
import { Icon } from '../../types/Icon';

export function CheckIcon({ color = 'black', size }: Icon) {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 24" fill="none">
      <Path d="M11.75 14.25L9.5 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M15.5 10.5L11.75 14.25" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <Path fillRule="evenodd" clipRule="evenodd" d="M12.5 21C7.52944 21 3.5 16.9706 3.5 12V12C3.5 7.02944 7.52944 3 12.5 3V3C17.4706 3 21.5 7.02944 21.5 12V12C21.5 16.9706 17.4706 21 12.5 21V21Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
}