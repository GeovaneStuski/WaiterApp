import { ActivityIndicator, Text, View } from 'react-native';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Categories } from './components/Categories';
import { Menu } from './components/Menu';
import { TableModal } from './components/TableModal';
import { OrderProvider } from '../../contexts/OrderContext';
import { Empty } from '../../components/Empty';
import { useHome } from './useHome';

export function Home() {
  const {
    ListProductsByCategory,
    categories,
    loading,
    loadingProducts,
    products
  } = useHome();

  return (
    <OrderProvider>
      <TableModal />

      <View className='px-6 flex-1 mt-6'>
        <Header />

        {loading && (
          <View className='flex-1 items-center justify-center'>
            <ActivityIndicator size="large" color="#D73035"/>
          </View>
        )}

        {!loading && (
          <>
            <Categories 
              categories={categories}
              onChangeCategory={ListProductsByCategory}
            />

            {!loadingProducts ? (
              <>
                {products.length > 0 ? (
                  <Menu products={products} />
                ) : (
                  <View className='flex-1 items-center justify-center'>
                    <Empty />

                    <Text className='mt-4 text-base text-gray-main'>Nem um Produto encontrado!</Text>
                  </View>
                )}
              </>
            ) : (
              <View className='flex-1 items-center justify-center'>
                <ActivityIndicator size="large" color="#D73035"/>
              </View>
            ) }
          </>
        )}
      </View>

      <Footer />
    </OrderProvider>
  );
}