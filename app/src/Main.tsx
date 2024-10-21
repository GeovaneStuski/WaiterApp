import { SafeAreaView, Platform, StatusBar } from 'react-native';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Categories } from './components/Categories';
import { Products } from './components/Products';
import { TableModal } from './components/TableModal';
import { useState } from 'react';
import { ProductModal } from './components/ProductModal';

const isAndroid = Platform.OS === 'android';

export function Main() {
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<object | null>(null);

  // function handleOpenTableModal() {
  //   setIsTableModalVisible(true);
  // }

  function handleOpenProductModal(product: object) {
    setSelectedProduct(product);
    setIsProductModalVisible(true);
  }

  function handleCloseTableModal() {
    setIsTableModalVisible(false);
  }
  
  function handleCloseProductModal() {
    setIsProductModalVisible(false);
  }
  return (
    <>
      <TableModal
        isVisible={isTableModalVisible}
        onClose={handleCloseTableModal}
      />

      <ProductModal
        isVisible={isProductModalVisible}
        product={selectedProduct}
        onClose={handleCloseProductModal} 
      />

      <SafeAreaView className="flex-1 bg-slate-50" style={{ marginTop: isAndroid ? StatusBar.currentHeight : 0}}>
        <Header/>

        <Categories/>

        <Products onModalOpen={handleOpenProductModal}/>
      </SafeAreaView>

      <Footer/>

      <StatusBar backgroundColor={'#000'}/>
    </>
  );
}