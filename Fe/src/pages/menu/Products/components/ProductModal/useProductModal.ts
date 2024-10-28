import { useContext, useEffect, useState } from 'react';
import { Ingredient } from '../../../../../types/Ingredient';
import { Category } from '../../../../../types/Category';
import { AuthenticationContext } from '../../../../../contexts/AuthenticationContext';
import IngredientsList from '../../../../../services/IngredientsList';
import CategoriesList from '../../../../../services/CategoriesList';
import NotAuthorizedError from '../../../../../Errors/NotAuthorizedError';
import ProductsList from '../../../../../services/ProductsList';
import { Product } from '../../../../../types/Product';

type useProductModalProps = {
  onReload: () => void;
  onClose: () => void;
  product: Product | null;
}

export function useProductModal({ onClose, onReload, product }: useProductModalProps) {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [image, setImage] = useState<null | File | string>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<null | Category>(null);
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);
  const [isIngredientModalVisible, setIsIngredientModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const isFormValid = !!(image && name && description && category && price);

  const { handleLogout } = useContext(AuthenticationContext);

  async function loadIngredients() {
    const ingredients = await IngredientsList.index();

    setIngredients(ingredients);
  }

  async function loadCategories() {
    const categories = await CategoriesList.index();

    setCategories(categories);
  }

  useEffect(() => {
    loadIngredients();
    loadCategories();
  }, []);

  useEffect(() => {
    if(product) {
      setImage(product.imagePath);
      setName(product.name);
      setDescription(product.description);
      setCategory(product.category);
      setIngredientsList(product.ingredients.map(ingredient => ingredient._id));
      setPrice(product.price.toString());
    } else {
      setImage(null);
      setName('');
      setDescription('');
      setCategory(null);
      setIngredientsList([]);
      setPrice('');
    }
  }, [product]);

  function handleChangeName(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleChangeDescription(event: React.ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
  }

  function handleChangePrice(event: React.ChangeEvent<HTMLInputElement>) {
    setPrice(event.target.value);
  }

  function handleChangeCategory(category: Category | null) {
    setCategory(category);
  }

  function handleChangeIngredientsList(event: React.ChangeEvent<HTMLInputElement>) {
    if(event.target.checked) {
      setIngredientsList(prevState => [...prevState, event.target.id]);
    }

    if(!event.target.checked) {
      setIngredientsList(prevState => prevState.filter((ingredientId) => ingredientId !== event.target.id));
    }
  }

  function handleChangeImage(event: React.ChangeEvent<HTMLInputElement>) {
    if(!event.target.files?.length) return;

    setImage(event.target.files[0]);
  }

  function handleOpenIngredientModal() {
    setIsIngredientModalVisible(true);
  }

  function handleCloseIngredientModal() {
    setIsIngredientModalVisible(false);
  }

  async function handleSubmit() {
    setLoading(true);

    const body = {
      image,
      name,
      description,
      price: price,
      category: category?._id,
      ingredients: JSON.stringify(ingredientsList)
    };

    try {
      if(product) {
        await ProductsList.update(product._id, body);
      } else {
        await ProductsList.create(body);
      }
    } catch(error) {
      if(error instanceof NotAuthorizedError) {
        handleLogout();
      }
    } finally {
      setLoading(false);
      onReload();
      onClose();
    }
  }

  return {
    loadIngredients,
    image,
    handleChangeImage,
    name,
    handleChangeName,
    description,
    handleChangeDescription,
    categories,
    category,
    handleChangeCategory,
    ingredients,
    ingredientsList,
    handleChangeIngredientsList,
    price,
    handleChangePrice,
    isIngredientModalVisible,
    handleOpenIngredientModal,
    handleCloseIngredientModal,
    isFormValid,
    handleSubmit,
    loading,
  };
}
