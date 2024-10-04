import { CSSProperties, ReactNode } from 'react';
import { cn } from '../utils/cn';
import { Button } from './Button';
import { CloseIcon } from './Icons/CloseIcon';
import { useUnmount } from '../hooks/useUnmount';

type ModalProps = {
  size?: string;
  children: ReactNode;
  title: string;
  cancelLabel?: string;
  confirmLabel?: string;
  isVisible: boolean;
  isLoading: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
  onClose?: () => void;
}

export function Modal({
  size = '480px',
  children,
  title,
  cancelLabel,
  confirmLabel,
  isVisible,
  onCancel,
  onConfirm,
  onClose,
  isLoading,
}: ModalProps) {
  const { itemRef, shouldBeRender } = useUnmount(isVisible);

  if(!shouldBeRender) return;

  return (
    <div ref={itemRef} className={cn('fixed w-screen h-screen bg-black/60 backdrop-blur-[1px] top-0 left-0 flex justify-center items-center', {
      'animate-fade-in': isVisible,
      'animate-fade-out': !isVisible,
    })}>
      <div
        style={{ '--CustomWidth': size} as CSSProperties}
        className={cn('bg-white w-[--CustomWidth] p-8 rounded-md flex flex-col gap-8', {
          'animate-scale-in': isVisible,
          'animate-scale-out': !isVisible,
        })}
      >
        <header className='flex justify-between'>
          <h1 className='font-bold text-2xl'>{title}</h1>

          <button onClick={onClose}><CloseIcon className='w-4'/></button>
        </header>

        {children}

        {(onCancel || onConfirm) && (
          <footer className='flex justify-between'>
            {onCancel && (
              <Button
                type='button'
                onClick={onCancel}
                style='cancel'>{cancelLabel}
              </Button>
            )}
            {onConfirm && (
              <Button
                type='button'
                isLoading={isLoading}
                onClick={onConfirm}
                style='fit'>{confirmLabel}
              </Button>
            )}
          </footer>
        )}
      </div>
    </div>
  );
}
