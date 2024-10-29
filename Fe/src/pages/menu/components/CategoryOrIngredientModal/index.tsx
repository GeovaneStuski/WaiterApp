import { FormGroup } from '../../../../components/FormGroup';
import { Input } from '../../../../components/Input';
import { Modal } from '../../../../components/Modal';
import { Category } from '../../../../types/Category';
import { Ingredient } from '../../../../types/Ingredient';
import { useCategoryOrIngredientModal } from './useCategoryOrIngredientModal';

type CategoryOrIngredientModalProps = {
  onClose: () => void;
  onCreateItem?: (item: Ingredient | Category) => void;
  onUpdateItem?: (item: Ingredient | Category) => void;
  item?: Category | Ingredient | null;
  type: 'Categoria' | 'Ingrediente';
  isVisible: boolean;
}

export function CategoryOrIngredientModal({
  isVisible,
  onClose,
  onCreateItem,
  onUpdateItem,
  type,
  item,
}: CategoryOrIngredientModalProps) {
  const {
    loading,
    handleSubmit,
    isFormValid,
    onChangeName: handleChangeName,
    onChangeIcon: handleChangeIcon,
    icon,
    name
  } = useCategoryOrIngredientModal({ item, onClose, onCreateItem, onUpdateItem, type });

  return (
    <Modal
      isVisible={isVisible}
      onConfirm={handleSubmit}
      confirmLabel={`${item ? 'Salvar Alterações' : `Criar ${type}`}`}
      onClose={onClose}
      isFormValid={isFormValid}
      isLoading={loading}
      title={`${item ? 'Editar' : type === 'Categoria' ? 'Nova' : 'Novo'} ${type}`}
    >
      <FormGroup>
        <Input
          value={icon}
          onChange={handleChangeIcon}
          label='Emoji'
          placeholder="Digite um Emoji"
        />
      </FormGroup>

      <FormGroup>
        <Input
          value={name}
          onChange={handleChangeName}
          label='Nome'
          placeholder="Digite o nome do Ingrediente"
        />
      </FormGroup>
    </Modal>
  );
}
