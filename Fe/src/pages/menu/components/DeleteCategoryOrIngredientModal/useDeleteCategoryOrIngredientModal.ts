import { useState } from 'react';
import CategoriesList from '../../../../services/CategoriesList';
import IngredientsList from '../../../../services/IngredientsList';
import { Category } from '../../../../types/Category';
import { Ingredient } from '../../../../types/Ingredient';


type useDeleteCategoryOrIngredientModalProps = {
  onClose: () => void;
  type: 'Categoria' | 'Ingrediente';
  item: Category | Ingredient;
  onDeleteItem: (itemId: string) => void;
}

export function useDeleteCategoryOrIngredientModal({ onClose, type, item, onDeleteItem }: useDeleteCategoryOrIngredientModalProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);

      const id = item._id;
      if(type === 'Categoria') {
        await CategoriesList.delete(id);
      } else {
        await IngredientsList.delete(id);
      }

      onDeleteItem(id);
    } catch {

    } finally {
      setLoading(false);
      onClose();
    }
  }

  return {
    handleSubmit,
    loading
  };
}
