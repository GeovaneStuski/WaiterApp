import { ActivityIndicator, SafeAreaView, StatusBar, Text, View } from 'react-native';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Categories } from '../components/Categories';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { OrderProvider } from '../contexts/OrderContext';
import { useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { Category } from '../types/Category';
import { Empty } from '../components/Empty';
import { api } from '../utils/api';
import { Platform } from 'react-native';

const isAndroid = Platform.OS === 'android';

export function Home() {
  const [loading, setLoading] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    Promise.all([
      api.get('/categories'),
      api.get('/products')
    ])
      .then(([categoriesResponse, productsResponse]) => {
        setCategories(categoriesResponse.data);
        setProducts(productsResponse.data);
      })
      .catch(error => console.log('error ' + error))
      .finally(() => setLoading(false));
  }, []);

  async function ListProductsByCategory(categoryId: string | null) {
    setLoadingProducts(true);

    const route = categoryId ? `/categories/${categoryId}/products` : '/products';
    try {
      const { data } = await api.get(route);

      setProducts(data);
    } catch {
      console.log('list product error');
    } finally {
      setLoadingProducts(false);
    }
  }

  return (
    <OrderProvider>
      <TableModal />

      <SafeAreaView className="flex-1 bg-slate-50" style={{marginTop: isAndroid ? StatusBar.currentHeight : 0}}>
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
      </SafeAreaView>

      <Footer />
    </OrderProvider>
  );
}