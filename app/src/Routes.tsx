import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from './screens/Home';
import { HomeIcon } from './components/icons/HomeIcon';
import { OrderIcon } from './components/icons/OrderIcon';
import { Orders } from './screens/Orders';
import { Profile } from './screens/Profile';
import { ProfileIcon } from './components/icons/ProfileIcon';
import { ScreenProps } from './types/ScreenProps';
import { useContext, useEffect } from 'react';
import { AuthContext } from './contexts/AuthContext';

const Tab = createBottomTabNavigator();

export function Routes({ navigation }: ScreenProps) {
  const { authenticated, loading } = useContext(AuthContext);

  useEffect(() => {
    if(!loading && !authenticated) {
      navigation.navigate('Login');
    }
  }, [authenticated, loading]);
  
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