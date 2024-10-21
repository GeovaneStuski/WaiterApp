import { View } from 'react-native';
import { HomeIcon } from '../icons/HomeIcon';
import { PageContainer } from './components/PageContainer';
import { OrderIcon } from '../icons/OrderIcon';
import { ProfileIcon } from '../icons/ProfileIcon';
import { useState } from 'react';

export function BottomBar() {
  const [selected, setSelected] = useState('Home');

  return (
    <View className="w-full flex-row justify-between items-center">
      <PageContainer selected={selected} onChange={(page) => setSelected(page)} icon={HomeIcon} page='Home'/>

      <PageContainer selected={selected} onChange={(page) => setSelected(page)} icon={OrderIcon} page='Pedidos'/>
      
      <PageContainer selected={selected} onChange={(page) => setSelected(page)} icon={ProfileIcon} page='Meu Perfil'/>
    </View>
  );
}