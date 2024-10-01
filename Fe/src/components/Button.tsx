import { ReactNode } from 'react';
import { cn } from '../utils/cn';

type ButtonProps = {
  children: ReactNode;
  size?: 'full' | 'fit';
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset'
}

export function Button({ children, disabled = false, size = 'full', onClick, type = 'button'}: ButtonProps) {
  return(
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={cn('bg-red-main text-white h-12 rounded-full font-bold text-md hover:bg-red-dark active:bg-red-light transition-colors disabled:bg-gray-lighter duration-300', {
        'w-full': size === 'full',
        'px-10': size === 'fit'
      })}>
      {children}
    </button>
  );
}
