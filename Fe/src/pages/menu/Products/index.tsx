import { useContext, useEffect, useState } from 'react';
import { Button } from '../../../components/Button';
import { Table } from '../../../components/Table';
import { Product } from '../../../types/Product';
import ProductsList from '../../../services/ProductsList';
import NotAuthorizedError from '../../../Errors/NotAuthorizedError';
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';
import { getImageByPath } from '../../../utils/getImageByPath';
import { Loader } from '../../../components/Loader';
import { priceFormater } from '../../../utils/priceFormater';
import { ProductModal } from './components/ProductModal';
import { DeleteProductModal } from './components/DeleteProductModal';

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [productToBeUpdate, setProductToBeUpdate] = useState<null | Product>(null);
  const [productToBeDeleted, setProductToBeDeleted] = useState<null | Product>(null);
  const [isDeleteProductModalVisible, setIsDeleteProductModalVisible] = useState(false);

  const { handleLogout } = useContext(AuthenticationContext);

  async function loadProducts() {
    setLoading(true);
    try {
      const products = await ProductsList.index();

      setProducts(products);
    } catch(error) {
      if(error instanceof NotAuthorizedError) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleOpenCreateProductModal() {
    setProductToBeUpdate(null);
    setIsProductModalVisible(true);
  }

  function handleOpenUpdateProductModal(product: Product) {
    setProductToBeUpdate(product);
    setIsProductModalVisible(true);
  }

  function handleCloseProductModal() {
    setIsProductModalVisible(false);
  }

  function handleOpenDeleteProductModal(product: Product) {
    setProductToBeDeleted(product);
    setIsDeleteProductModalVisible(true);
  }
  function handleCloseDeleteProductModal() {
    setIsDeleteProductModalVisible(false);
  }

  return (
    <div>
      <Loader isVisible={loading}/>

      <ProductModal
        isVisible={isProductModalVisible}
        onClose={handleCloseProductModal}
        onReload={loadProducts}
        product={productToBeUpdate}
      />

      <DeleteProductModal
        isVisible={isDeleteProductModalVisible}
        onClose={handleCloseDeleteProductModal}
        onReload={loadProducts}
        product={productToBeDeleted}
      />

      <header className='flex justify-between items-center text-sm'>
        <div className='flex gap-2 items-center'>
          <h1 className='font-bold text-lg'>Produtos</h1>

          <span className='px-2 rounded-md text-base font-semibold bg-gray-light/20 mt-0.5'>{products.length}</span>
        </div>

        <Button style='cancel' onClick={handleOpenCreateProductModal}>Novo Produto</Button>
      </header>

      <Table
        onAction={handleOpenUpdateProductModal}
        onDelete={handleOpenDeleteProductModal}
        head={[
          { name: 'Imagem', style: 'text-start w-24' },
          { name: 'Nome', style: 'text-start' },
          { name: 'Categoria', style: 'text-start' },
          { name: 'Preço', style: 'text-start' },
        ]}
        body={products.map((product) => ({
          id: product._id,
          item: product,
          items: [
            { item: <img className='w-14 rounded-md' src={getImageByPath(product.imagePath)}/> },
            { item: product.name },
            { item: product.category && `${product.category.icon} ${product.category.name}`},
            { item: priceFormater(product.price)}
          ]
        }))}
      />
    </div>
  );
}
