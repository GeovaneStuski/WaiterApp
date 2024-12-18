import Svg, { Path } from 'react-native-svg';
import { Icon } from '../../types/Icon';

export function HiddenEyeIcon({ color, size }: Icon) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12.0001 19C11.1581 19 10.3151 18.822 9.49609 18.505" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M20.882 12.468C18.99 15.967 15.495 19 12 19" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M19.0791 8.92102C19.7701 9.73002 20.3841 10.612 20.8821 11.533C21.0391 11.824 21.0391 12.177 20.8821 12.468" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M5 19L19 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M9.77309 14.227C8.54309 12.997 8.54309 11.002 9.77309 9.77199C11.0031 8.54199 12.9981 8.54199 14.2281 9.77199" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M17.0442 6.956C15.4972 5.759 13.7482 5 12.0002 5C8.50524 5 5.01024 8.033 3.11824 11.533C2.96124 11.824 2.96124 12.177 3.11824 12.468C4.06424 14.217 5.41024 15.849 6.95624 17.045" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
}
