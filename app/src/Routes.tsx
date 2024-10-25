import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from './pages/Home';
import { HomeIcon } from './components/icons/HomeIcon';
import { OrderIcon } from './components/icons/OrderIcon';
import { Orders } from './pages/Orders';
import { Profile } from './pages/Profile';
import { ProfileIcon } from './components/icons/ProfileIcon';

const Tab = createBottomTabNavigator();

export function Routes() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({size, color}) => <HomeIcon size={size} color={color}/>,
          tabBarStyle: {
            height: 64,
          },
          tabBarLabelStyle: {
            fontWeight: '600',
            fontSize: 14,
            marginBottom: 8,
          },
          tabBarInactiveTintColor: '#333',
          tabBarActiveTintColor: '#D73035',
          
        }}
      />

      <Tab.Screen
        name='Pedidos'
        component={Orders}
        options={{
          headerShown: false,
          tabBarIcon: ({size, color}) => <OrderIcon size={size} color={color}/>,
          tabBarStyle: {
            height: 64,
          },
          tabBarLabelStyle: {
            fontWeight: '600',
            fontSize: 14,
            marginBottom: 8,
          },
          tabBarInactiveTintColor: '#333',
          tabBarActiveTintColor: '#D73035',
          
        }}
      />

      <Tab.Screen
        name='Meu Perfil'
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({size, color}) => <ProfileIcon size={size} color={color}/>,
          tabBarStyle: {
            height: 64,
          },
          tabBarLabelStyle: {
            fontWeight: '600',
            fontSize: 14,
            marginBottom: 8,
          },
          tabBarInactiveTintColor: '#333',
          tabBarActiveTintColor: '#D73035',
          
        }}
      />
    </Tab.Navigator>
  );
}