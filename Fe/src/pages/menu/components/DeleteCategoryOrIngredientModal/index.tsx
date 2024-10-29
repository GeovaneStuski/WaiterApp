import { Modal } from '../../../../components/Modal';
import { Category } from '../../../../types/Category';
import { Ingredient } from '../../../../types/Ingredient';
import { useDeleteCategoryOrIngredientModal } from './useDeleteCategoryOrIngredientModal';

type DeleteCategoryOrIngredientModalProps = {
  onClose: () => void;
  onDeleteItem: (itemId: string) => void;
  item: Category | Ingredient | null;
  type: 'Categoria' | 'Ingrediente';
  isVisible: boolean;
}

export function DeleteCategoryOrIngredientModal({ item, onClose, type, isVisible, onDeleteItem }: DeleteCategoryOrIngredientModalProps) {
  if(!item) return;
  const {
    handleSubmit,
    loading,
  } = useDeleteCategoryOrIngredientModal({ onClose, item, type, onDeleteItem });

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
