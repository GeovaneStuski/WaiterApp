import { ActivityIndicator, SafeAreaView, Text, View } from 'react-native';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Categories } from './components/Categories';
import { Menu } from './components/Menu';
import { TableModal } from './components/TableModal';
import { OrderProvider } from './contexts/OrderContext';
import { useEffect, useState } from 'react';
import { Product } from './types/Product';
import { products as mockProducts } from './mocks/products';
import { Category } from './types/Category';
import { Empty } from './components/Empty';
import { api } from './utils/api';

export function Main() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    Promise.all([
      api.get('/categories'),
      api.get('/products')
    ]).then(([categoriesResponse, productsResponse]) => {
      setCategories(categoriesResponse.data);
      setProducts(productsResponse.data);
      setLoading(false);
    }).catch(error => console.log('error ' + error));
  }, []);

  return (
    <OrderProvider>
      <TableModal />

      <SafeAreaView className="flex-1 bg-slate-50">
        <Header />

        {loading && (
          <View className='flex-1 items-center justify-center'>
            <ActivityIndicator size="large" color="#D73035"/>
          </View>
        )}

        {!loading && (
          <>
            <Categories categories={categories} />

            {products.length > 0 ? (
              <Menu products={products} />
            ) : (
              <View className='flex-1 items-center justify-center'>
                <Empty />

                <Text className='mt-4 text-base text-gray-main'>Nem um Produto encontrado!</Text>
              </View>
            )}
          </>
        )}
      </SafeAreaView>

      <Footer />
    </OrderProvider>
  );
}