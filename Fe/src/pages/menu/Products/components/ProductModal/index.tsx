import { Button } from '../../../../../components/Button';
import { Modal } from '../../../../../components/Modal';
import { Input } from '../../../../../components/Input';
import { CreateCategoryOrIngredientModal as IngredientsModal } from '../../../components/CreateCategoryOrIngredientModalProps';
import { useProductModal } from './useProductModal';
import { ImageContainer } from './components/ImageContainer';
import { CategoryContainer } from './components/CategoryContainer';
import { IngredientsContainer } from './components/IngredientsContainer';
import { Product } from '../../../../../types/Product';

type ProductModalProps = {
  onClose: () => void;
  onReload: () => void;
  isVisible: boolean;
  product: Product | null;
}

export function ProductModal({ onClose, isVisible, onReload, product }: ProductModalProps) {
  const {
    ingredients,
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
  } = useProductModal({onClose, onReload, product});

  return (
    <Modal
      isVisible={isVisible}
      title={`${product ? 'Editar Produto' : 'Novo Produto'}`}
      onClose={onClose}
      onConfirm={handleSubmit}
      confirmLabel={`${product ? 'Salvar Alterações' : 'Cadastrar Produto'}`}
      isLoading={loading}
      isFormValid={isFormValid}
      size='928px'
    >
      <div className='flex gap-8 h-[600px] text-sm'>
        <IngredientsModal
          onClose={handleCloseIngredientModal}
          isVisible={isIngredientModalVisible}
          onReload={loadIngredients}
          type='Ingrediente'
        />

        <div className='w-full h-full flex flex-col justify-between'>
          <h1 className='font-bold text-lg text-gray-main'>Imagem</h1>

          <ImageContainer
            image={image}
            onChange={handleChangeImage}
          />

          <Input
            value={name}
            onChange={handleChangeName}
            placeholder='Digite o nome do Produto'
            label='Nome do Produto'
          />

          <Input
            value={description}
            onChange={handleChangeDescription}
            placeholder='Digite a descrição do Produto'
            label='Descrição'
          />

          <CategoryContainer
            categories={categories}
            category={category}
            onChange={handleChangeCategory}
          />
        </div>

        <div className='w-full flex flex-col gap-6' >
          <header className='flex items-center justify-between' >
            <h1 className='font-bold text-lg text-gray-main'>Ingredinets</h1>

            <Button style='cancel' onClick={handleOpenIngredientModal}>Novo Ingrediente</Button>
          </header>

          <IngredientsContainer
            ingredients={ingredients}
            onChange={handleChangeIngredientsList}
            ingredientsList={ingredientsList}
          />

          <Input
            label='Preço'
            placeholder='Digite o preço do Produto'
            type='number'
            value={price}
            onChange={handleChangePrice}
          />
        </div>
      </div>
    </Modal>
  );
}

