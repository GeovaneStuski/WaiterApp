import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../../screens/Home';
import { HomeIcon } from '../icons/HomeIcon';
import { Orders } from '../../screens/Orders';
import { OrderIcon } from '../icons/OrderIcon';
import { Profile } from '../../screens/Profile';
import { ProfileIcon } from '../icons/ProfileIcon';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { ScreenProps } from '../../types/ScreenProps';

const Tab = createBottomTabNavigator();

export function MainStack({navigation}: ScreenProps) {
  const { loading, authenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && !authenticated) {
      navigation.navigate('Login');
    }
  }, [loading, authenticated]);
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarInactiveTintColor: '#333',
        tabBarActiveTintColor: '#D73035',
        tabBarLabelStyle: {
          fontWeight: '600',
          fontSize: 14,
          marginBottom: 8,
        },
        tabBarStyle: {
          height: 64,
        },
        headerShown: false
      }}
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({size, color}) => <HomeIcon size={size} color={color}/>,
        }}
      />

      <Tab.Screen
        name='Pedidos'
        component={Orders}
        options={{
          tabBarIcon: ({size, color}) => <OrderIcon size={size} color={color}/>,
        }}
      />

      <Tab.Screen
        name='Meu Perfil'
        component={Profile}
        options={{
          tabBarIcon: ({size, color}) => <ProfileIcon size={size} color={color}/>,  
        }}
      />
    </Tab.Navigator>
  );
}