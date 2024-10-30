import { useEffect, useState } from 'react';
import { Ingredient } from '../../../../types/Ingredient';
import { Category } from '../../../../types/Category';
import IngredientsList from '../../../../services/IngredientsList';
import CategoriesList from '../../../../services/CategoriesList';

type useCategoryOrIngredientModalProps = {
  item?: Ingredient | Category | null;
  onClose: () => void;
  type: 'Categoria' | 'Ingrediente',
  onCreateItem?: (item: Ingredient | Category) => void;
  onUpdateItem?: (item: Ingredient | Category) => void;
}

export function useCategoryOrIngredientModal({ item, onClose, type, onCreateItem, onUpdateItem }: useCategoryOrIngredientModalProps) {
  const [icon, setIcon] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const isFormValid = icon && name.length > 1 || false;

  useEffect(() => {
    if(item) {
      setIcon(item.icon);
      setName(item.name);
    } else {
      setIcon('');
      setName('');
    }
  }, [item]);

  function handleChangeIcon(event: React.ChangeEvent<HTMLInputElement>) {
    setIcon(event.target.value);
  }

  function handleChangeName(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  async function handleCreateItem() {
    try {
      let item;

      setLoading(true);

      if(type === 'Ingrediente') {
        item = await IngredientsList.create({ icon, name });
      }else {
        item = await CategoriesList.create({ icon, name });
      }

      onCreateItem && onCreateItem(item);
    } catch {

    } finally {
      setLoading(false);
      onClose();
    }
  }

  async function handleUpdateItem() {
    try {
      let itemToUpdate;

      setLoading(true);

      if(type === 'Ingrediente') {
        itemToUpdate = await IngredientsList.update(item!._id, { icon, name });
      }else {
        itemToUpdate = await CategoriesList.update(item!._id, { icon, name });
      }

      onUpdateItem && onUpdateItem(itemToUpdate);
    } catch{

    } finally {
      setLoading(false);
      onClose();
    }
  }

  function handleSubmit() {
    if(item) {
      handleUpdateItem();
    } else {
      handleCreateItem();
    }
  }

  return {
    loading,
    onSubmit: handleSubmit,
    isFormValid,
    onChangeName: handleChangeName,
    onChangeIcon: handleChangeIcon,
    icon,
    name
  };
}
