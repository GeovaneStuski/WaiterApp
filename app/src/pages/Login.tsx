import { Text, TouchableOpacity, View } from 'react-native';

type HomeProps = {
  navigation: {
    navigate: (page: string) => void; 
  }
}


export function Login({ navigation }: HomeProps) {
  return (
    <View className="flex-1 bg-blue-500">
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>Home</Text>
      </TouchableOpacity>
    </View>
  );
}