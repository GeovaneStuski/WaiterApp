import { useContext, useEffect, useState } from 'react';
import { Button } from '../../../components/Button';
import { Table } from '../../../components/Table';
import { Category } from '../../../types/Category';
import CategoriesList from '../../../services/CategoriesList';
import { DeleteCategoryOrIngredientModal } from '../components/DeleteCategoryOrIngredientModal';
import { CreateCategoryOrIngredientModal } from '../components/CreateCategoryOrIngredientModalProps';
import NotAuthorizedError from '../../../Errors/NotAuthorizedError';
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';
import { Loader } from '../../../components/Loader';

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [categoryToBeDeleted, setCategoryToBeDeleted] = useState<Category | null>(null);
  const [categoryToBeUpdate, setCategoryToBeUpdate] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);

  const { handleLogout } = useContext(AuthenticationContext);

  async function loadCategories() {
    setLoading(true);
    try {
      const categories = await CategoriesList.index();

      setCategories(categories);
    } catch(error) {
      if(error instanceof NotAuthorizedError) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  function handleOpenCreateModal() {
    setIsCategoryModalVisible(true);
  }

  function handleOpenUpdateModal(category: Category) {
    setCategoryToBeUpdate(category);
    setIsCategoryModalVisible(true);
  }

  function handleCloseCategoryModal() {
    setCategoryToBeUpdate(null);
    setIsCategoryModalVisible(false);
  }

  function handleOpenDeleteModal(category: Category) {
    setCategoryToBeDeleted(category);
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setCategoryToBeDeleted(null);
    setIsDeleteModalVisible(false);
  }

  return (
    <div>
      <Loader isVisible={loading} />

      <CreateCategoryOrIngredientModal
        onClose={handleCloseCategoryModal}
        onReload={loadCategories}
        item={categoryToBeUpdate}
        isVisible={isCategoryModalVisible}
        type='Categoria'
      />

      <DeleteCategoryOrIngredientModal
        onClose={handleCloseDeleteModal}
        onReload={loadCategories}
        item={categoryToBeDeleted}
        isVisible={isDeleteModalVisible}
        type='Categoria'
      />

      <header className='flex justify-between items-center text-sm'>
        <div className='flex gap-2 items-center'>
          <h1 className='font-bold text-lg'>Categorias</h1>

          <span className='px-2 rounded-md text-base font-semibold bg-gray-light/20 mt-0.5'>{categories.length}</span>
        </div>

        <Button style='cancel' onClick={handleOpenCreateModal}>Nova Categoria</Button>
      </header>

      <Table
        onAction={handleOpenUpdateModal}
        onDelete={handleOpenDeleteModal}
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
