import { useEffect, useState } from 'react';
import { Ingredient } from '../../../../../types/Ingredient';
import { Category } from '../../../../../types/Category';
import IngredientsList from '../../../../../services/IngredientsList';
import CategoriesList from '../../../../../services/CategoriesList';
import ProductsList from '../../../../../services/ProductsList';
import { Product } from '../../../../../types/Product';
import { toast } from 'react-toastify';

type useProductModalProps = {
  onUpdate: (product: Product) => void;
  onCreate: (product: Product) => void;
  onClose: () => void;
  product: Product | null;
  isVisible: boolean;
}

export function useProductModal({ onClose, onCreate, onUpdate, product, isVisible }: useProductModalProps) {
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
  const [isIngredientAndCategoryLoading, setIsIngredientAndCategoryLoading] = useState(true);

  const isFormValid = !!(image && name && description && category && price);

  useEffect(() => {
    if(!isVisible) return;

    if(isVisible && ingredients.length < 1 || categories.length < 1) {
      (async function getData() {
        const [ingredients, categories] = await Promise.all([
          IngredientsList.index(),
          CategoriesList.index(),
        ]);

        setIngredients(ingredients);
        setCategories(categories);
        setIsIngredientAndCategoryLoading(false);
      })();
    }
  }, [isVisible]);

  useEffect(() => {
    if(product) {
      setImage(product?.imagePath || '');
      setName(product?.name || '');
      setDescription(product?.description || '');
      setCategory(product?.category || null);
      setIngredientsList(product?.ingredients.map(ingredient => ingredient._id) || []);
      setPrice(product?.price.toString() || '');
    } else {
      setImage('');
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

  function handleCreateIngredient(ingredient: Ingredient) {
    setIngredients(PrevState => PrevState.concat(ingredient));
  }

  async function handleSubmit() {
    try {
      setLoading(true);

      const body = {
        image,
        name,
        description,
        price: price,
        category: category?._id,
        ingredients: JSON.stringify(ingredientsList)
      };

      if(product) {
        const updatedProduct = await ProductsList.update(product!._id, body);

        onUpdate(updatedProduct);
        toast.success('Produto editado');
      } else {
        const product = await ProductsList.create(body);

        onCreate(product);
        toast.success('Produto cadastrado');
      }
    } catch {

    } finally {
      setLoading(false);
      onClose();
    }
  }

  return {
    image,
    onChangeImage: handleChangeImage,
    name,
    onChangeName: handleChangeName,
    description,
    onChangeDescription: handleChangeDescription,
    categories,
    category,
    onChangeCategory: handleChangeCategory,
    ingredients,
    ingredientsList,
    onChangeIngredientsList: handleChangeIngredientsList,
    price,
    onChangePrice: handleChangePrice,
    isIngredientModalVisible,
    onOpenIngredientModal: handleOpenIngredientModal,
    onCloseIngredientModal: handleCloseIngredientModal,
    isFormValid,
    onSubmit: handleSubmit,
    loading,
    onCreateIngredient: handleCreateIngredient,
    isIngredientAndCategoryLoading,
  };
}
