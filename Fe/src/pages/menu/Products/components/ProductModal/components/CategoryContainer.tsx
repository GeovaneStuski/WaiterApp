import { Button } from '../../../../../../components/Button';
import { Spinner } from '../../../../../../components/Spinner';
import { Category } from '../../../../../../types/Category';
import { cn } from '../../../../../../utils/cn';

type CategoryContainerProps = {
  category: Category | null;
  categories: Category[];
  onChange: (category: Category | null) => void;
  isLoading: boolean;
}

export function CategoryContainer({ categories, category, onChange, isLoading }:CategoryContainerProps) {
  return (
    <div className={cn('space-y-2', {
      'flex justify-between items-center': category,
    })}>
      <span>Categoria</span>

      {!category && !isLoading && (
        <div className='grid grid-cols-3 gap-2 overflow-y-auto h-full max-h-[100px] px-1 flex-1'>
          {categories.map((category) => (
            <button
              onClick={() => onChange(category)}
              className='border border-gray-lighter rounded-full h-11'
              key={category._id}
            >
              {`${category.icon} ${category.name}`}
            </button>
          ))}
        </div>
      )}

      {isLoading && (
        <div className='flex justify-center items-center'>
          <Spinner size={32}/>
        </div>
      )}

      {category && (
        <div className='border border-gray-lighter rounded-full h-10 flex justify-center items-center gap-2 px-2'>
          {`${category.icon} ${category.name}`} <Button onClick={() => onChange(null)} style='cancel'>Alterar</Button>
        </div>
      )}
    </div>
  );
}
