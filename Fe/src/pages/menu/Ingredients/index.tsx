import { Table } from '../../../components/Table';
import { DeleteCategoryOrIngredientModal as DeleteIngredientModal } from '../components/DeleteCategoryOrIngredientModal';
import { CategoryOrIngredientModal as IngredientModal } from '../components/CategoryOrIngredientModal';
import { Loader } from '../../../components/Loader';
import { useIngredients } from './useIngredients';
import { Header } from './components/Header';

export function Ingredients() {
  const {
    loading,
    onCloseIngredientModal,
    onCreate,
    onUpdate,
    ingredientToBeUpdate,
    isIngredientsModalVisible,
    onCloseDeleteModal,
    onDeleteIngredient,
    ingredientToBeDeleted,
    isDeleteModalVisible,
    onOpenCreateModal,
    ingredients,
    onOpenUpdateModal,
    onOpenDeleteModal,
  } = useIngredients();
  return (
    <div>
      <Loader isVisible={loading} />

      <IngredientModal
        onClose={onCloseIngredientModal}
        item={ingredientToBeUpdate}
        isVisible={isIngredientsModalVisible}
        onCreateItem={onCreate}
        onUpdateItem={onUpdate}
        type='Ingrediente'
      />

      <DeleteIngredientModal
        onClose={onCloseDeleteModal}
        onDeleteItem={onDeleteIngredient}
        item={ingredientToBeDeleted}
        isVisible={isDeleteModalVisible}
        type='Ingrediente'
      />

      <Header
        onOpenModal={onOpenCreateModal}
        length={ingredients?.length}
      />

      <Table
        onAction={onOpenUpdateModal}
        onDelete={onOpenDeleteModal}
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
