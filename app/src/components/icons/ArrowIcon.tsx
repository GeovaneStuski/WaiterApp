import { Path, Svg } from 'react-native-svg';
import { Icon } from '../../types/Icon';

export function ArrowIcon({ color = 'black', size }: Icon) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M14 8L10 12L14 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
}