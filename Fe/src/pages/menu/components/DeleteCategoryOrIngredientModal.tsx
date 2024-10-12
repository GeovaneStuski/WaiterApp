import { useContext, useState } from 'react';
import { Modal } from '../../../components/Modal';
import CategoriesList from '../../../services/CategoriesList';
import IngredientsList from '../../../services/IngredientsList';
import { Category } from '../../../types/Category';
import { Ingredient } from '../../../types/Ingredient';
import NotAuthorizedError from '../../../Errors/NotAuthorizedError';
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';

type DeleteCategoryOrIngredientModalProps = {
  onClose: () => void;
  onReload: () => void;
  item: Category | Ingredient | null;
  type: 'Categoria' | 'Ingrediente';
  isVisible: boolean;
}

export function DeleteCategoryOrIngredientModal({ item, onClose, onReload, type, isVisible }: DeleteCategoryOrIngredientModalProps) {
  if(!item) return;
  const [loading, setLoading] = useState(false);

  const { handleLogout } = useContext(AuthenticationContext);

  async function handleSubmit() {
    if(!item) return;
    setLoading(true);

    try {
      if(type === 'Categoria') {
        await CategoriesList.delete(item._id);
      } else {
        await IngredientsList.delete(item._id);
      }
    } catch(error) {
      if(error instanceof NotAuthorizedError) {
        handleLogout();
      }
    } finally {
      setLoading(false);
      onClose();
      onReload();
    }
  }
  return (
    <Modal
      title={`Excluir ${type}`}
      confirmLabel={`Excluir ${type}`}
      cancelLabel={`Manter ${type}`}
      onConfirm={handleSubmit}
      isLoading={loading}
      isVisible={isVisible}
      onClose={onClose}
      onCancel={onClose}
    >
      <div className='flex flex-col items-center gap-4'>
        <span className='font-semibold text-base text-main'>Tem certeza que deseja excluir {type === 'Categoria' ? 'a' : 'o'} {type}</span>

        <span className='border border-gray-lighter/70 px-4 py-2 rounded-full'>{item.icon} {item.name}</span>
      </div>
    </Modal>
  );
}
