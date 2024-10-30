import { useEffect, useState } from 'react';
import { Product } from '../../../types/Product';
import { toast } from 'react-toastify';
import ProductsList from '../../../services/ProductsList';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [productToBeUpdate, setProductToBeUpdate] = useState<null | Product>(null);
  const [productToBeDeleted, setProductToBeDeleted] = useState<null | Product>(null);
  const [isDeleteProductModalVisible, setIsDeleteProductModalVisible] = useState(false);

  useEffect(() => {
    (async function loadProducts() {
      try {
        const products = await ProductsList.index();

        setProducts(products);
      } catch {

      } finally {
        setLoading(false);
      }
    })();
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

  function handleDeleteProduct(productId: string) {
    setProducts(PrevState => PrevState.filter((product) => product._id !== productId));
    toast.success('Produto deletado');
  }

  function handleCreateProduct(product: Product) {
    setProducts(PrevState => PrevState.concat(product));
    toast.success('Produto cadastrado');
  }

  function handleUpdateProduct(product: Product) {
    setProducts(PrevState => PrevState.map(
      (prevProduct) => prevProduct._id === product._id ? product : prevProduct)
    );
  }

  return {
    products,
    loading,
    isProductModalVisible,
    productToBeUpdate,
    productToBeDeleted,
    isDeleteProductModalVisible,
    onOpenCreateModal: handleOpenCreateProductModal,
    onOpenUpdateModal: handleOpenUpdateProductModal,
    onCloseProductModal: handleCloseProductModal,
    onOpenDeleteModal: handleOpenDeleteProductModal,
    onCloseDeleteModal: handleCloseDeleteProductModal,
    onDelete: handleDeleteProduct,
    onCreate: handleCreateProduct,
    onUpdate: handleUpdateProduct,
  };
}
