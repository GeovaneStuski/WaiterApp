import { useContext, useEffect, useState } from 'react';
import { SplashModal } from './components/SplashModal';
import { Login } from './screens/Login';
import { MainStack } from './components/MainStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from './contexts/AuthContext';

const Stack = createNativeStackNavigator();

export function Routes() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const { loading } = useContext(AuthContext);

  useEffect(() => {
    const timer = setTimeout(() => setIsSplashVisible(false), 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SplashModal isVisible={isSplashVisible} />

      <Stack.Navigator>
        <Stack.Screen
          name='MainStack'
          component={MainStack}
          options={{
            headerShown: false,
          }}
        />
        
        <Stack.Screen
          name='LoginStack' 
          component={Login}
          options={{
            headerShown: false,
          }}
        />

      </Stack.Navigator>
    </>
  );
}

