import { SafeAreaView, StatusBar } from 'react-native';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Categories } from './components/Categories';
import { Products } from './components/Products';
import { TableModal } from './components/TableModal';
import { useState } from 'react';
import { ProductModal } from './components/ProductModal';
import { Product } from './types/Product';
import { Order } from './types/Order';

export function Main() {
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [orderProducts, setOrderProducts] = useState<Order[]>([]);

  function handleOpenTableModal() {
    setIsTableModalVisible(true);
  }

  function handleAddProductInOrderProducts(product: Product) {
    if(!selectedTable) {
      setIsTableModalVisible(true);
    }

    const productAlreadyInList = orderProducts.find(({product:orderProduct}) => orderProduct._id === product._id);

    if(productAlreadyInList) {
      const orders = orderProducts.filter(({product: orderProduct}) => product._id !== orderProduct._id );

      setOrderProducts([...orders, {
        quantity: productAlreadyInList.quantity + 1,
        product,
      }]);
    } else {
      setOrderProducts(PrevState => [...PrevState, {
        quantity: 1,
        product,
      }]);
    }
  }

  function handleDecreaseProductQuantityOfOrder(productId: string) {
    const order = orderProducts.find(({product}) => product._id === productId);
    const orders = orderProducts.filter(({product}) => product._id !== productId);

    if(!order) return;

    if(order.quantity > 1) {
      setOrderProducts([...orders, {
        product: order.product,
        quantity: order.quantity - 1,
      }]);
    } else {
      setOrderProducts(prevState => prevState.filter(({product}) => product._id !== productId));
    }
  }

  function handleIncreaseProductQuantityOfOrder(productId: string) {
    const order = orderProducts.find(({product}) => product._id === productId);
    const orders = orderProducts.filter(({product}) => product._id !== productId);

    if(!order) return;

    setOrderProducts([...orders, {
      product: order.product,
      quantity: order.quantity + 1,
    }]);
  }


  function handleOpenProductModal(product: Product) {
    setSelectedProduct(product);
    setIsProductModalVisible(true);
  }

  function handleCloseTableModal() {
    setIsTableModalVisible(false);
  }
  
  function handleCloseProductModal() {
    setIsProductModalVisible(false);
  }

  function handleCancelOrder() {
    setSelectedTable(null);
    setOrderProducts([]);
  }
  return (
    <>
      <TableModal
        isVisible={isTableModalVisible}
        onClose={handleCloseTableModal}
        onSave={setSelectedTable}
      />

      <ProductModal
        isVisible={isProductModalVisible}
        product={selectedProduct}
        onClose={handleCloseProductModal} 
      />

      <SafeAreaView className="flex-1 bg-slate-50">
        <Header
          table={selectedTable}
          onCancel={handleCancelOrder}
          onChange={handleOpenTableModal}
        />

        <Categories/>

        <Products
          onProductModalOpen={handleOpenProductModal}
          onTableModalOpen={handleAddProductInOrderProducts}
        />
      </SafeAreaView>

      <Footer
        table={selectedTable}
        order={orderProducts}
        onDecreaseQuantity={handleDecreaseProductQuantityOfOrder}
        onIncreaseQuantity={handleIncreaseProductQuantityOfOrder}
      />

      <StatusBar backgroundColor={'#000'}/>
    </>
  );
}