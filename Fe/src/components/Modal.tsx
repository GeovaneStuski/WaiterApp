import { CSSProperties, ReactNode } from 'react';
import { cn } from '../utils/cn';
import { Button } from './Button';
import { CloseIcon } from './Icons/CloseIcon';
import { useUnmount } from '../hooks/useUnmount';
import { ReactPortals } from './ReactPortals';

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
  isFormValid?: boolean;
  buttonStyle?: 'fit' | 'full'
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
  isFormValid = true,
  buttonStyle = 'fit'
}: ModalProps) {
  const { itemRef, shouldBeRender } = useUnmount(isVisible);

  if(!shouldBeRender) return;

  return (
    <ReactPortals containerId='modal-root'>
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

            <button onClick={onClose}><CloseIcon className='w-8'/></button>
          </header>

          {children}

          {(onCancel || onConfirm) && (
            <footer className={cn('flex items-center', {
              'justify-between': onCancel && onConfirm,
              'justify-end': !onCancel && onConfirm,
            })}>
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
                  style={buttonStyle}
                  disabled={!isFormValid}
                >
                  {confirmLabel}
                </Button>
              )}
            </footer>
          )}
        </div>
      </div>
    </ReactPortals>
  );
}
