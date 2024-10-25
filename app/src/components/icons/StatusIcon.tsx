import { View } from 'react-native';

type StatusIconProps = {
  color: {
    external: string;
    internal: string;
  };
  size: number;
}

export function StatusIcon({ color, size }: StatusIconProps) {
  return (
    <View 
      style={{ 
        width: size * 2, 
        height: size * 2,
        backgroundColor: color.external,
      }}
      className='rounded-full items-center justify-center'
    >
      <View style={{ 
        width: size, 
        height: size, 
        backgroundColor: color.internal,
      }} className='rounded-full items-center justify-center'/>
    </View>
  );
}