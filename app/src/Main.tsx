import { SafeAreaView, StatusBar } from 'react-native';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Categories } from './components/Categories';
import { Menu } from './components/Menu';
import { TableModal } from './components/TableModal';
import { useState } from 'react';
import { Product } from './types/Product';
import { CartItem } from './types/CartItem';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function handleOpenTableModal() {
    setIsTableModalVisible(true);
  }

  function handleAddItemInCart(product: Product) {
    if(!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItems(PrevState => {
      const itemIndex = PrevState.findIndex(({product: cartProduct}) => cartProduct._id === product._id);

      if (itemIndex < 0) {
        return [... PrevState, {
          quantity: 1,
          product,
        }];
      } else {
        const newCartItems = [...PrevState];
        const item = newCartItems[itemIndex];

        newCartItems[itemIndex] = {
          ...item,
          quantity: item.quantity + 1
        };

        return newCartItems;
      }
    });
  }

  function handleRemoveItemFromCart(product: Product) {
    setCartItems(PrevState => {
      const itemIndex = PrevState.findIndex(({product: cartProduct}) => cartProduct._id === product._id);
      
      const newCartItems = [...PrevState];
      const item = newCartItems[itemIndex];

      if(item.quantity === 1) {
        newCartItems.splice(itemIndex, 1);
        return newCartItems;
      }

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1
      };

      return newCartItems;
    });


  }

  function handleCloseTableModal() {
    setIsTableModalVisible(false);
  }

  function handleCancelOrder() {
    setSelectedTable(null);
    setCartItems([]);
  }
  return (
    <>
      <TableModal
        isVisible={isTableModalVisible}
        onClose={handleCloseTableModal}
        onSave={setSelectedTable}
      />

      <SafeAreaView className="flex-1 bg-slate-50">
        <Header
          table={selectedTable}
          onCancel={handleCancelOrder}
          onChange={handleOpenTableModal}
        />

        <Categories/>

        <Menu
          onAddItemInCart={handleAddItemInCart}
        />
      </SafeAreaView>

      <Footer
        table={selectedTable}
        cart={cartItems}
        onAddToCart={handleAddItemInCart}
        onRemoveFromCart={handleRemoveItemFromCart}
      />

      <StatusBar backgroundColor={'#000'}/>
    </>
  );
}