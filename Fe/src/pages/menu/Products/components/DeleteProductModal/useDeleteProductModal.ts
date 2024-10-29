import { useState } from 'react';
import ProductsList from '../../../../../services/ProductsList';
import { Product } from '../../../../../types/Product';

type useDeleteProductModalProps = {
  onClose: () => void;
  onDelete: (productId: string) => void;
  product: Product | null;
}

export function useDeleteProductModal({ onClose, onDelete, product }: useDeleteProductModalProps) {
  const [loading, setLoading] = useState(false);

  async function handleSumit() {
    try {
      setLoading(true);

      await ProductsList.delete(product!._id);

      onDelete(product!._id);
    } catch {

    } finally {
      setLoading(false);
      onClose();
    }
  }
  return {
    loading,
    onSubmit: handleSumit,
  };
}
