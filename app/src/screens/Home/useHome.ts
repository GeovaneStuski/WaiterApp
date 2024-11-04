import { useCallback, useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import socketIo from 'socket.io-client';
import { APIURL } from '@env';
import { ApiError } from '../../errors/ApiError';

import { ApiRequest } from '../../utils/ApiRequest';
import { Notification } from '../../types/Notification';
import { Category } from '../../types/Category';
import { Product } from '../../types/Product';
import { useFocusEffect } from '@react-navigation/native';

export function useHome() {
  const [loading, setLoading] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isNotificationsModalVisible, setIsNotificationsModalVisible] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const { onLogout } = useContext(AuthContext);

  async function getData() {
    try {
      const [categories, products, notifications] = await Promise.all([
        ApiRequest({
          method: 'get',
          endPoint: '/categories',
        }),
    
        ApiRequest({
          method: 'get',
          endPoint: '/products',
        }),

        ApiRequest({
          method: 'get',
          endPoint: '/notifications',
        })
      ]);

      setCategories(categories);
      setProducts(products);
      setNotifications(notifications);
    } catch(errorResponse) {
      const error = errorResponse as ApiError;

      if (error.status === 401) {
        onLogout();
      }
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  useEffect(() => {
    const socket = socketIo(APIURL, {
      transports: ['websocket'],
    });

    socket.on('new@Notification', (notification: Notification) => {
      if(!notifications.find((prevNotification) => prevNotification._id === notification._id)) {
        setNotifications(PrevState => PrevState.concat(notification));
      }
    });
  }, []);

  async function ListProductsByCategory(categoryId: string | null) {
    setLoadingProducts(true);

    const route = categoryId ? `/categories/${categoryId}/products` : '/products';
    try {
      const products = await ApiRequest({
        method: 'get',
        endPoint: route,
      });

      setProducts(products);
    } catch(errorResponse) {
      const error = errorResponse as ApiError;

      if (error.status === 401) {
        onLogout();
      }
    } finally {
      setLoadingProducts(false);
    }
  }

  function handleOpenNotificationsModal() {
    setIsNotificationsModalVisible(true);
  }

  function handleCloseNotificationsModal() {
    setIsNotificationsModalVisible(false);
  }

  function onReadNotification(notificationId: string) {
    setNotifications(PrevState => PrevState.map(
      (notification) => notification._id === notificationId 
        ? {...notification, seen: true} 
        : notification
    ));
  }

  function handleDeleteNotification(notificationId: string) {
    setNotifications(PrevState => PrevState.filter(notification => notification._id !== notificationId));
  }

  function handleClearNotifications() {
    setNotifications([]);
  }

  return {
    loading,
    products,
    categories,
    notifications,
    loadingProducts,
    ListProductsByCategory,
    onOpenNotificationsModal: handleOpenNotificationsModal,
    onCloseNotificationsModal: handleCloseNotificationsModal,
    isNotificationsModalVisible,
    onReadNotification,
    onDeleteNotification: handleDeleteNotification,
    onClearNotifications: handleClearNotifications,

  };
}