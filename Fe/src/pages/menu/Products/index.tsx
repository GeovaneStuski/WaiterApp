import { Table } from '../../../components/Table';
import { getImageByPath } from '../../../utils/getImageByPath';
import { Loader } from '../../../components/Loader';
import { formatCurrency } from '../../../utils/formatCurrency';
import { ProductModal } from './components/ProductModal';
import { DeleteProductModal } from './components/DeleteProductModal';
import { useProducts } from './useProducts';
import { Header } from './components/Header';

export function Products() {
  const {
    products,
    loading,
    isProductModalVisible,
    productToBeUpdate,
    productToBeDeleted,
    isDeleteProductModalVisible,
    onOpenCreateModal,
    onOpenUpdateModal,
    onCloseProductModal,
    onOpenDeleteModal,
    onCloseDeleteModal,
    onDelete,
    onCreate,
    onUpdate,
  } = useProducts();;

  return (
    <div>
      <Loader isVisible={loading}/>

      <ProductModal
        isVisible={isProductModalVisible}
        onClose={onCloseProductModal}
        product={productToBeUpdate}
        onUpdate={onUpdate}
        onCreate={onCreate}
      />

      <DeleteProductModal
        isVisible={isDeleteProductModalVisible}
        onClose={onCloseDeleteModal}
        product={productToBeDeleted}
        onDelete={onDelete}
      />

      <Header
        length={products?.length}
        onOpenModal={onOpenCreateModal}
      />

      <Table
        onAction={onOpenUpdateModal}
        onDelete={onOpenDeleteModal}
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
            { item: formatCurrency(product.price)}
          ]
        }))}
      />
    </div>
  );
}
