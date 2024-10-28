import { createContext, ReactNode, useState } from 'react';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';
import { ApiRequest } from '../utils/ApiRequest';

type CartProviderProps = {
  children: ReactNode;
}

type OrderProps = {
  cartItems: CartItem[];
  onAddProductToCart: (product: Product) => void;
  onDecrementProductFromCart: (product: Product) => void;
  isTableModalVisible: boolean;
  table: string | null;
  onOpenTableModal: () => void;
  onChangeTable: (table: string) => void;
  onCloseTableModal: () => void;
  onCreateOrder: () => void;
  onCancelOrder: () => void;
  isConfirmModalVisible: boolean;
}

export const OrderContext = createContext({} as OrderProps);

export function OrderProvider({children}: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isTableModalVisible, setIsTableModalVisible] = useState(false); 
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [table, setTable] = useState<string | null>(null);
  
  function handleOpenConfirmModal() {
    setIsConfirmModalVisible(true);

    setTimeout(() => setIsConfirmModalVisible(false), 2500);
  }

  function handleOpenTableModal() {
    setIsTableModalVisible(true);
  }

  function handleChangeTable(table: string) {
    setTable(table);
    setIsTableModalVisible(false);
  }

  function handleCloseTableModal() {
    setIsTableModalVisible(false);
  }

  function handleAddProductToCart(product: Product) {
    if(!table) {
      setIsTableModalVisible(true);
    }
    setCartItems(PrevState => {
      const itemIndex = PrevState.findIndex(item => item.product._id === product._id);

      if(itemIndex >= 0) {
        const newCartItems = [...PrevState];
        const item = newCartItems[itemIndex];

        newCartItems[itemIndex] = {
          ...item,
          quantity: item.quantity + 1,
        };

        return newCartItems;
      } else {
        return [...PrevState, {
          product,
          quantity: 1,
        }];
      }
    });
  }

  function handleDecrementProductFromCart(product: Product) {
    setCartItems(PrevState => {
      const itemIndex = PrevState.findIndex(item => item.product._id === product._id);

      const newCartItems = [...PrevState];
      const item = newCartItems[itemIndex];
        
      if(item.quantity === 1) {
        newCartItems.splice(itemIndex, 1);

        return newCartItems;
      } else {
        newCartItems[itemIndex] = {
          ...item,
          quantity: item.quantity -1,
        };

        return newCartItems;
      }
    });
  }

  async function handleCreateOrder() {
    try {
      const products = cartItems.map(({product, quantity}) => ({ product: product._id, quantity }));
      await ApiRequest({
        method: 'post',
        endPoint: '/orders',
        body: {
          table,
          products,
        }
      });

      handleOpenConfirmModal();
      setTable(null);
      setCartItems([]);
    } catch {
      //
    }
  }

  function handleCancelOrder() {
    setTable(null);
    setCartItems([]);
  }

  return (
    <OrderContext.Provider value={{
      cartItems,
      onAddProductToCart: handleAddProductToCart,
      onDecrementProductFromCart: handleDecrementProductFromCart,
      table,
      isTableModalVisible,
      onOpenTableModal: handleOpenTableModal,
      onChangeTable: handleChangeTable,
      onCloseTableModal: handleCloseTableModal,
      onCreateOrder: handleCreateOrder,
      onCancelOrder: handleCancelOrder,
      isConfirmModalVisible,
    }}>
      {children}
    </OrderContext.Provider>
  );
}