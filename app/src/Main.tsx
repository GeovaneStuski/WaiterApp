import { NavigationContainer } from '@react-navigation/native';
import { Routes } from './Routes';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import { AuthProvider } from './contexts/AuthContext';

const isAndroid = Platform.OS === 'android';

export function Main() {
  return (
    <NavigationContainer>
      <SafeAreaView className="flex-1 bg-slate-50" style={{marginTop: isAndroid ? StatusBar.currentHeight : 0}}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </SafeAreaView>
    </NavigationContainer>
  );
}