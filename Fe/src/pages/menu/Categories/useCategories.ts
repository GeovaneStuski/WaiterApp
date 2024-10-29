import { useEffect, useState } from 'react';
import CategoriesList from '../../../services/CategoriesList';
import { Category } from '../../../types/Category';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [categoryToBeDeleted, setCategoryToBeDeleted] = useState<Category | null>(null);
  const [categoryToBeUpdate, setCategoryToBeUpdate] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);

  async function loadCategories() {
    setLoading(true);
    try {
      const categories = await CategoriesList.index();

      setCategories(categories);
    } catch {

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

  function handleCreateCategory(category: Category) {
    setCategories(PrevState => PrevState.concat(category));
  }

  function handleUpdateCategory(category: Category) {
    setCategories(PrevState => PrevState.map(
      (prevCategory) => prevCategory._id === category._id ? category : prevCategory)
    );
  }

  function handleDeleteCategory(categoryId: string) {
    setCategories(PrevState => PrevState.filter((category) => category._id !== categoryId));
  }

  return {
    onDelete: handleDeleteCategory,
    onUpdate: handleUpdateCategory,
    onCreate: handleCreateCategory,
    onCloseDeleteModal: handleCloseDeleteModal,
    onOpenDeleteModal: handleOpenDeleteModal,
    onCloseModal: handleCloseCategoryModal,
    onOpenUpdateModal: handleOpenUpdateModal,
    onOpenCreateModal: handleOpenCreateModal,
    isCategoryModalVisible,
    isDeleteModalVisible,
    categoryToBeDeleted,
    categoryToBeUpdate,
    loading,
    categories,
  };
}
