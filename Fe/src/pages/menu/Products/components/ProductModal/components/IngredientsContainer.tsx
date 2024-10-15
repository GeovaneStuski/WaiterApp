import { useState } from 'react';
import { Input } from '../../../../../../components/Input';
import { Ingredient } from '../../../../../../types/Ingredient';
import { cn } from '../../../../../../utils/cn';

type IngredientsContainerProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  ingredientsList: string[];
  ingredients: Ingredient[];
}

export function IngredientsContainer({ ingredientsList, onChange, ingredients }: IngredientsContainerProps) {
  const [searchParam, setSearchParam] = useState('');

  function handleChangeSearchParam(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchParam(event.target.value);
  }

  const filtredIngredients = ingredients.filter(({name}) => name.toLowerCase().includes(searchParam.toLowerCase()));
  return (
    <>
      <Input
        value={searchParam}
        onChange={handleChangeSearchParam}
        placeholder='Digite o nome do Ingrediente'
        label='Busque o Ingrediente'
      />

      <div className={cn('overflow-y-auto space-y-2', {
        'pr-1': ingredientsList.length > 6
      })}>
        {filtredIngredients.map(({ _id, icon, name }) => (
          <div
            key={_id}
            className={'w-full border border-gray-lighter h-12 flex justify-between items-center px-4 rounded-md'}
          >
            <div className='flex gap-2'>
              <span>{icon}</span>

              <span>{name}</span>
            </div>

            <input
              id={_id}
              onChange={onChange}
              checked={ingredientsList.includes(_id)}
              type="checkbox"
            />
          </div>
        ))}
      </div>
    </>
  );
}
