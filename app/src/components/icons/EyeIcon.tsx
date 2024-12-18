import Svg, { Path } from 'react-native-svg';
import { Icon } from '../../types/Icon';

export function EyeIcon({ color, size }: Icon) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path fillRule="evenodd" clipRule="evenodd" d="M3.11824 12.467C2.96124 12.176 2.96124 11.823 3.11824 11.532C5.01024 8.033 8.50524 5 12.0002 5C15.4952 5 18.9902 8.033 20.8822 11.533C21.0392 11.824 21.0392 12.177 20.8822 12.468C18.9902 15.967 15.4952 19 12.0002 19C8.50524 19 5.01024 15.967 3.11824 12.467Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <Path fillRule="evenodd" clipRule="evenodd" d="M14.1215 9.87868C15.2931 11.0503 15.2931 12.9498 14.1215 14.1213C12.95 15.2929 11.0505 15.2929 9.8789 14.1213C8.70733 12.9498 8.70733 11.0503 9.8789 9.87868C11.0505 8.70711 12.95 8.70711 14.1215 9.87868Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
}
