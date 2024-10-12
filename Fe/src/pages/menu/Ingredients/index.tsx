import { useContext, useEffect, useState } from 'react';
import { Button } from '../../../components/Button';
import { Table } from '../../../components/Table';
import { DeleteCategoryOrIngredientModal } from '../components/DeleteCategoryOrIngredientModal';
import { CreateCategoryOrIngredientModal } from '../components/CreateCategoryOrIngredientModalProps';
import IngredientsList from '../../../services/IngredientsList';
import { Ingredient } from '../../../types/Ingredient';
import NotAuthorizedError from '../../../Errors/NotAuthorizedError';
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';
import { Loader } from '../../../components/Loader';

export function Ingredients() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isIngredientsModalVisible, setIsIngredientsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [ingredientToBeDeleted, setIngredientToBeDeleted] = useState<Ingredient | null>(null);
  const [ingredientToBeUpdate, setIngredientToBeUpdate] = useState<Ingredient | null>(null);
  const [loading, setLoading] = useState(false);

  const { handleLogout } = useContext(AuthenticationContext);

  async function loadIngredients() {
    setLoading(true);
    try {
      const ingredients = await IngredientsList.index();

      setIngredients(ingredients);
    } catch(error) {
      if(error instanceof NotAuthorizedError) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    loadIngredients();
  }, []);

  function handleOpenCreateModal() {
    setIngredientToBeUpdate(null);
    setIsIngredientsModalVisible(true);
  }

  function handleOpenUpdateModal(ingredient: Ingredient) {
    setIngredientToBeUpdate(ingredient);
    setIsIngredientsModalVisible(true);
  }

  function handleCloseIngredientModal() {
    setIsIngredientsModalVisible(false);
  }

  function handleOpenDeleteModal(ingredient: Ingredient) {
    setIngredientToBeDeleted(ingredient);
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  return (
    <div>
      <Loader isVisible={loading} />

      <CreateCategoryOrIngredientModal
        onClose={handleCloseIngredientModal}
        onReload={loadIngredients}
        item={ingredientToBeUpdate}
        isVisible={isIngredientsModalVisible}
        type='Ingrediente'
      />

      <DeleteCategoryOrIngredientModal
        onClose={handleCloseDeleteModal}
        onReload={loadIngredients}
        item={ingredientToBeDeleted}
        isVisible={isDeleteModalVisible}
        type='Ingrediente'
      />

      <header className='flex justify-between items-center text-sm'>
        <div className='flex gap-2 items-center'>
          <h1 className='font-bold text-lg'>Ingredientes</h1>

          <span className='px-2 rounded-md text-base font-semibold bg-gray-light/20 mt-0.5'>{ingredients.length}</span>
        </div>

        <Button style='cancel' onClick={handleOpenCreateModal}>Novo Ingrediente</Button>
      </header>

      <Table
        onAction={handleOpenUpdateModal}
        onDelete={handleOpenDeleteModal}
        head={[
          { name: 'Emoji', style: 'text-center w-24' },
          { name: 'Nome', style: 'text-start' },
        ]}
        body={ingredients.map((ingredient) => ({
          id: ingredient._id,
          item: ingredient,
          items: [
            { item: ingredient.icon },
            { item: ingredient.name },
          ]
        }))}
      />
    </div>
  );
}
