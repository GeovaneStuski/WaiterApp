import { useContext, useEffect, useState } from 'react';
import { FormGroup } from '../../../components/FormGroup';
import { Input } from '../../../components/Input';
import { Modal } from '../../../components/Modal';
import IngredientsList from '../../../services/IngredientsList';
import NotAuthorizedError from '../../../Errors/NotAuthorizedError';
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';
import { Category } from '../../../types/Category';
import { Ingredient } from '../../../types/Ingredient';
import CategoriesList from '../../../services/CategoriesList';

type CreateCategoryOrIngredientModalProps = {
  onClose: () => void;
  onReload: () => void;
  item?: Category | Ingredient | null;
  type: 'Categoria' | 'Ingrediente';
  isVisible: boolean;
}

export function CreateCategoryOrIngredientModal({ isVisible, onClose, onReload, type, item }: CreateCategoryOrIngredientModalProps) {
  const [icon, setIcon] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const isFormValid = icon && name.length > 1 || false;

  const { handleLogout } = useContext(AuthenticationContext);

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
    setLoading(true);
    try {
      if(type === 'Ingrediente') {
        await IngredientsList.create({ icon, name });
      }else {
        await CategoriesList.create({ icon, name });
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

  async function handleUpdateItem() {
    if(!item) return;
    setLoading(true);
    try {
      if(type === 'Ingrediente') {
        await IngredientsList.update(item._id, { icon, name });
      }else {
        await CategoriesList.update(item._id, { icon, name });
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

  function handleSubmit() {
    if(item) {
      handleUpdateItem();
    } else {
      handleCreateItem();
    }
  }

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
