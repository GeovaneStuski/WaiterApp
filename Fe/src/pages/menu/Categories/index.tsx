import { Button } from '../../../components/Button';
import { Table } from '../../../components/Table';
import { DeleteCategoryOrIngredientModal as CategoryDeleteModal } from '../components/DeleteCategoryOrIngredientModal';
import { CategoryOrIngredientModal as CategoryModal } from '../components/CategoryOrIngredientModal';
import { Loader } from '../../../components/Loader';
import { useCategories } from './useCategories';
import { Header } from './components/Header';

export function Categories() {
  const {
    onDelete,
    onUpdate,
    onCreate,
    onCloseDeleteModal,
    onOpenDeleteModal,
    onCloseModal,
    onOpenUpdateModal,
    onOpenCreateModal,
    isCategoryModalVisible,
    isDeleteModalVisible,
    categoryToBeDeleted,
    categoryToBeUpdate,
    loading,
    categories,
  } = useCategories();

  return (
    <div>
      <Loader isVisible={loading} />

      <CategoryModal
        onClose={onCloseModal}
        onCreateItem={onCreate}
        onUpdateItem={onUpdate}
        item={categoryToBeUpdate}
        isVisible={isCategoryModalVisible}
        type='Categoria'
      />

      <CategoryDeleteModal
        onClose={onCloseDeleteModal}
        onDeleteItem={onDelete}
        item={categoryToBeDeleted}
        isVisible={isDeleteModalVisible}
        type='Categoria'
      />

      <Header
        length={categories.length}
        onOpenModal={onOpenCreateModal}
      />

      <Table
        onAction={onOpenUpdateModal}
        onDelete={onOpenDeleteModal}
        head={[
          { name: 'Emoji', style: 'text-center w-24' },
          { name: 'Nome', style: 'text-start' },
        ]}
        body={categories.map((category) => ({
          id: category._id,
          item: category,
          items: [
            { item: category.icon },
            { item: category.name },
          ]
        }))}
      />
    </div>
  );
}
