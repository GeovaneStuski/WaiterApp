import { useState } from 'react';
import { Button } from '../../../../../components/Button';
import { Modal } from '../../../../../components/Modal';
import { Form } from './components/FormContainer';
import { ImageContainer } from './components/ImageContainer';
import { IngredientsContainer } from './components/IngrendientsContainer';
import { Ingredient } from '../../../../../types/Ingredient';

export function ProductModal() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  return (
    <Modal
      isVisible={true}
      title='Novo Produto'
      onClose={() => {}}
      onConfirm={() => {}}
      confirmLabel='Criar Produto'
      isLoading={false}
      size='928px'
    >
      <div className='flex gap-8'>
        <div className='w-full'>
          <h1 className='font-bold text-lg mb-4 text-gray-main'>Imagem</h1>

          <ImageContainer />

          <Form/>

        </div>
        <div className='w-full'>
          <header className='flex items-center justify-between text-sm mb-6'>
            <h1 className='font-bold text-lg text-gray-main'>Ingredinets</h1>

            <Button style='cancel'>Novo Ingrediente</Button>
          </header>

          <IngredientsContainer/>
        </div>
      </div>
    </Modal>
  );
}
