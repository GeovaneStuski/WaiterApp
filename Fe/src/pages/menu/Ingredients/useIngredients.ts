import { useEffect, useState } from 'react';
import { Ingredient } from '../../../types/Ingredient';
import IngredientsList from '../../../services/IngredientsList';

export function useIngredients() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isIngredientsModalVisible, setIsIngredientsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [ingredientToBeDeleted, setIngredientToBeDeleted] = useState<Ingredient | null>(null);
  const [ingredientToBeUpdate, setIngredientToBeUpdate] = useState<Ingredient | null>(null);
  const [loading, setLoading] = useState(false);

  async function loadIngredients() {
    setLoading(true);
    try {
      const ingredients = await IngredientsList.index();

      setIngredients(ingredients);
    } catch {

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

  function handleCreateIngredient(ingredient: Ingredient) {
    setIngredients(PrevState => PrevState.concat(ingredient));
  }

  function handleUpdateIngredient(ingredient: Ingredient) {
    setIngredients(PrevState => PrevState.map(
      (prevIngredient) => prevIngredient._id === ingredient._id ? ingredient : prevIngredient)
    );
  }

  function handleDeleteIngredient(ingredientId: string) {
    setIngredients(PrevState => PrevState.filter((ingredient) => ingredient._id !== ingredientId));
  }

  return {
    loading,
    onCloseIngredientModal: handleCloseIngredientModal,
    onCreate: handleCreateIngredient,
    onUpdate: handleUpdateIngredient,
    ingredientToBeUpdate,
    isIngredientsModalVisible,
    onCloseDeleteModal: handleCloseDeleteModal,
    onDeleteIngredient: handleDeleteIngredient,
    ingredientToBeDeleted,
    isDeleteModalVisible,
    onOpenCreateModal: handleOpenCreateModal,
    ingredients,
    onOpenUpdateModal: handleOpenUpdateModal,
    onOpenDeleteModal: handleOpenDeleteModal,
  };
}
