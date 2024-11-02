import { View } from 'react-native';

import { OrderProvider } from '../../contexts/OrderContext';
import { useHome } from './useHome';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Categories } from './components/Categories';
import { Menu } from './components/Menu';
import { TableModal } from './components/TableModal';
import { Empty } from '../../components/Empty';
import { NotificationsModal } from './components/NotificationsModal';
import { Loader } from '../../components/Loader';

export function Home() {
  const {
    ListProductsByCategory,
    categories,
    loading,
    loadingProducts,
    products,
    notifications,
    isNotificationsModalVisible,
    onOpenNotificationsModal,
    onReadNotification,
    onCloseNotificationsModal,
    onDeleteNotification,
    onClearNotifications
  } = useHome();

  const haveANewNotification = !!notifications.find((notification) => !notification.seen);

  return (
    <OrderProvider>
      <NotificationsModal
        onClose={onCloseNotificationsModal}
        isVisible={isNotificationsModalVisible}
        notifications={notifications}
        onReadNotification={onReadNotification}
        onDeleteNotification={onDeleteNotification}
        onClearNotifications={onClearNotifications}
      />

      <TableModal />

      <View className='px-6 flex-1 mt-6'>
        <Header
          onOpenNotificationModal={onOpenNotificationsModal}
          haveANewNotification={haveANewNotification}
        />

        {loading && (
          <Loader />
        )}

        {!loading && (
          <>
            <Categories 
              categories={categories}
              onChangeCategory={ListProductsByCategory}
            />

            {!loadingProducts && (
              <>
                {products.length > 0 && <Menu products={products} /> }

                {products.length < 1 && <Empty label='Nem um Produto encontrado!'/> }
              </>
            )}

            {loadingProducts && <Loader />}
          </>
        )}
      </View>

      <Footer />
    </OrderProvider>
  );
}