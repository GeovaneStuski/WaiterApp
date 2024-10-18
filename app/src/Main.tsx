import { SafeAreaView, Platform, StatusBar } from 'react-native';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Categories } from './components/Categories';
import { Products } from './components/Products';

const isAndroid = Platform.OS === 'android';

export function Main() {
  return (
    <>
      <SafeAreaView className="flex-1 bg-slate-50" style={{ marginTop: isAndroid ? StatusBar.currentHeight : 0}}>
        <Header/>

        <Categories/>

        <Products/>
      </SafeAreaView>

      <Footer/>
    </>
  );
}