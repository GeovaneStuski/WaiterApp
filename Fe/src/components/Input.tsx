import { useState } from 'react';
import { HiddenEyeIcon } from './Icons/HiddenEyeIcon';
import { EyeIcon } from './Icons/EyeIcon';
import { cn } from '../utils/cn';

type InputProps = {
  label: string;
  value: string | number;
  onChange?: (param: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (param: React.FocusEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

export function Input({
  label,
  value,
  onChange,
  onBlur,
  type = 'text',
  placeholder = '',
  error = '',
  disabled = false,
}: InputProps) {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  function handlePasswordVisible() {
    setIsVisiblePassword(prevState => !prevState);
  }
  return(
    <div className={cn('flex flex-col gap-2', {
      'opacity-60 select-none': disabled
    })}>
      <label className={cn('text-sm', { 'text-red-main': error})} htmlFor={label}>{label}</label>
      {type !== 'password' && (
        <input
          id={label}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          className={cn('text-sm w-full border outline-none h-[52px] rounded-lg p-4 caret-red-main duration-500', {
            'border-gray-light/70 focus-within:border-gray-main': !error,
            'border-red-main text-red-main': error
          })}/>
      )}

      {type === 'password' && (
        <div className={cn('w-full border bg-white h-[52px] rounded-lg flex justify-between overflow-hidden px-4 duration-500', {
          'border-gray-light/70 focus-within:border-gray-main': !error,
          'border-red-main text-red-main': error
        })}>
          <input
            id={label}
            value={value}
            onChange={onChange}
            type={isVisiblePassword ? 'text' : 'password'}
            placeholder={placeholder}
            className='w-full outline-none text-sm caret-red-main'
          />

          {value.toString().length > 0 && (
            <button type='button' className='w-6 text-gray-main' onClick={handlePasswordVisible}>
              {isVisiblePassword ? <EyeIcon/> : <HiddenEyeIcon/>}
            </button>
          )}
        </div>
      )}

      {error && <span className='text-sm text-red-main'>{error}</span>}
    </div>
  );
}
