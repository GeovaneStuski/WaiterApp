import { NavigationContainer } from '@react-navigation/native';
import { Routes } from './Routes';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import { Login } from './screens/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './contexts/AuthContext';
import { SplashModal } from './components/SplashModal';
import { useEffect, useState } from 'react';

const isAndroid = Platform.OS === 'android';

const Stack = createNativeStackNavigator();

export function Main() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsSplashVisible(false), 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaView className="flex-1 bg-slate-50" style={{marginTop: isAndroid ? StatusBar.currentHeight : 0}}>
        <AuthProvider>
          <SplashModal isVisible={isSplashVisible} />

          <Stack.Navigator>
            <Stack.Screen
              name='Login' 
              component={Login}
              options={{
                headerShown: false,
              }}
            />
          
            <Stack.Screen
              name='Main'
              component={Routes}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </AuthProvider>
      </SafeAreaView>
    </NavigationContainer>
  );
}