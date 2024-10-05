import { ReactNode } from 'react';
import { cn } from '../utils/cn';
import { Spinner } from './Spinner';

type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  style?: 'full' | 'fit' | 'cancel';
  isLoading?: boolean;
}

export function Button({ children, disabled = false, style = 'full', onClick, type = 'submit', isLoading = false}: ButtonProps) {
  return(
    <button
      disabled={disabled || isLoading}
      onClick={onClick}
      type={type}
      className={cn('bg-red-main text-white h-12 rounded-full font-bold text-md hover:bg-red-dark active:bg-red-light transition-colors disabled:bg-gray-lighter duration-300', {
        'w-full': style === 'full',
        'px-10': style === 'fit',
        'min-w-32': isLoading,
        'text-red-main bg-transparent w-fit flex gap-1 items-center hover:bg-transparent active:bg-transparent hover:text-red-dark active:text-red-light disabled:hover:text-gray-light disabled:bg-transparent disabled:text-gray-light disabled:hover:bg-transparent': style === 'cancel'
      })}>
      {!isLoading && children}

      {isLoading && (
        <div className='flex justify-center items-center'>
          {<Spinner size={20}/>}
        </div>
      )}
    </button>
  );
}
