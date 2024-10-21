import Svg, { Path } from 'react-native-svg';
import { Icon } from '../../types/Icon';

export function CloseIcon({ color = 'black', size }: Icon) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M16 8L12 12M12 12L16 16M12 12L8 8M12 12L8 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
}