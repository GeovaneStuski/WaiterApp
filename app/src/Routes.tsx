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
    if(!loading) {
      setTimeout(() => {
        setIsSplashVisible(false);
      }, 1000);
    }
  }, [loading]);

  return (
    <>
      <SplashModal isVisible={isSplashVisible} />

      <Stack.Navigator>
        <Stack.Screen
          name='Main'
          component={MainStack}
          options={{
            headerShown: false,
          }}
        />
        
        <Stack.Screen
          name='Login' 
          component={Login}
          options={{
            headerShown: false,
          }}
        />

      </Stack.Navigator>
    </>
  );
}

