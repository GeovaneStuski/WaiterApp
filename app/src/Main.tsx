import { SafeAreaView } from 'react-native';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Categories } from './components/Categories';
import { Menu } from './components/Menu';
import { TableModal } from './components/TableModal';
import { OrderProvider } from './contexts/OrderContext';
import { Platform, StatusBar } from 'react-native';

const isAndroid = Platform.OS === 'android';

export function Main() {
  return (
    <OrderProvider>
      <TableModal />

      <SafeAreaView className="flex-1 bg-slate-50" style={{marginTop: isAndroid ? StatusBar.currentHeight : 0}}>
        <Header />

        <Categories/>

        <Menu />
      </SafeAreaView>

      <Footer />
    </OrderProvider>
  );
}