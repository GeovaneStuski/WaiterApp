import { Button } from '../../../../../components/Button';
import { Modal } from '../../../../../components/Modal';
import { Input } from '../../../../../components/Input';
import { CategoryOrIngredientModal as IngredientsModal } from '../../../components/CategoryOrIngredientModal';
import { useProductModal } from './useProductModal';
import { ImageContainer } from './components/ImageContainer';
import { CategoryContainer } from './components/CategoryContainer';
import { IngredientsContainer } from './components/IngredientsContainer';
import { Product } from '../../../../../types/Product';

type ProductModalProps = {
  onClose: () => void;
  onUpdate: (product: Product) => void;
  onCreate: (product: Product) => void;
  isVisible: boolean;
  product: Product | null;
}

export function ProductModal({ onClose, isVisible, onCreate, onUpdate, product }: ProductModalProps) {
  const {
    ingredients,
    image,
    onChangeImage,
    name,
    onChangeName,
    description,
    onChangeDescription,
    categories,
    category,
    onChangeCategory,
    ingredientsList,
    onChangeIngredientsList,
    price,
    onChangePrice,
    isIngredientModalVisible,
    onOpenIngredientModal,
    onCloseIngredientModal,
    isFormValid,
    onSubmit,
    loading,
    isIngredientAndCategoryLoading,
  } = useProductModal({ onClose, onUpdate, onCreate, product, isVisible });

  return (
    <Modal
      isVisible={isVisible}
      title={`${product ? 'Editar Produto' : 'Novo Produto'}`}
      onClose={onClose}
      onConfirm={onSubmit}
      confirmLabel={`${product ? 'Salvar Alterações' : 'Cadastrar Produto'}`}
      isLoading={loading}
      isFormValid={isFormValid}
      size='928px'
    >
      <div className='flex gap-8 h-[600px] text-sm'>
        <IngredientsModal
          onClose={onCloseIngredientModal}
          isVisible={isIngredientModalVisible}
          type='Ingrediente'
        />

        <div className='w-full h-full flex flex-col justify-between'>
          <h1 className='font-bold text-lg text-gray-main'>Imagem</h1>

          <ImageContainer
            image={image}
            onChange={onChangeImage}
          />

          <Input
            value={name}
            onChange={onChangeName}
            placeholder='Digite o nome do Produto'
            label='Nome do Produto'
          />

          <Input
            value={description}
            onChange={onChangeDescription}
            placeholder='Digite a descrição do Produto'
            label='Descrição'
          />

          <CategoryContainer
            categories={categories}
            category={category}
            onChange={onChangeCategory}
            isLoading={isIngredientAndCategoryLoading}
          />
        </div>

        <div className='w-full flex flex-col gap-6' >
          <header className='flex items-center justify-between' >
            <h1 className='font-bold text-lg text-gray-main'>Ingredinets</h1>

            <Button style='cancel' onClick={onOpenIngredientModal}>Novo Ingrediente</Button>
          </header>

          <IngredientsContainer
            ingredients={ingredients}
            onChange={onChangeIngredientsList}
            ingredientsList={ingredientsList}
            isLoading={isIngredientAndCategoryLoading}
          />

          <Input
            label='Preço'
            placeholder='Digite o preço do Produto'
            type='number'
            value={price}
            onChange={onChangePrice}
          />
        </div>
      </div>
    </Modal>
  );
}

