import { useState } from 'react';
import { Input } from '../../../../../../components/Input';
import { Ingredient } from '../../../../../../types/Ingredient';
import { cn } from '../../../../../../utils/cn';
import { CheckedCheckBoxIcon } from '../../../../../../components/Icons/CheckedCheckBoxIcon';
import { CheckBoxIcon } from '../../../../../../components/Icons/CheckBoxIcon';

type IngredientsContainerProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  ingredientsList: string[];
  ingredients: Ingredient[];
};

export function IngredientsContainer({
  ingredientsList,
  onChange,
  ingredients,
}: IngredientsContainerProps) {
  const [searchParam, setSearchParam] = useState('');

  function handleChangeSearchParam(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchParam(event.target.value);
  }

  const filtredIngredients = ingredients.filter(({ name }) =>
    name.toLowerCase().includes(searchParam.toLowerCase()),
  );
  return (
    <>
      <Input
        value={searchParam}
        onChange={handleChangeSearchParam}
        placeholder="Digite o nome do Ingrediente"
        label="Busque o Ingrediente"
      />

      <div
        className={cn('space-y-2 overflow-y-auto', {
          'pr-1': ingredients.length > 6,
        })}
      >
        {filtredIngredients.map(({ _id, icon, name }) => (
          <div>
            <label
              htmlFor={_id}
              key={_id}
              className="flex h-12 w-full cursor-pointer items-center justify-between rounded-md border border-gray-lighter px-4"
            >
              <div className="flex gap-2">
                <span>{icon}</span>

                <span>{name}</span>
              </div>

              {ingredientsList.includes(_id) ? (
                <CheckedCheckBoxIcon className="w-5" />
              ) : (
                <CheckBoxIcon className="w-5" />
              )}
            </label>

            <input
              id={_id}
              onChange={onChange}
              checked={ingredientsList.includes(_id)}
              type="checkbox"
              className="sr-only"
            />
          </div>
        ))}
      </div>
    </>
  );
}

