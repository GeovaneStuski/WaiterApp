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
  buttonStyle?: 'fit' | 'full';
};

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
  buttonStyle = 'fit',
}: ModalProps) {
  const { itemRef, shouldBeRender } = useUnmount(isVisible);

  if (!shouldBeRender) return;

  return (
    <ReactPortals containerId="modal-root">
      <div
        ref={itemRef}
        className={cn(
          'fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-black/60 backdrop-blur-[1px]',
          {
            'animate-fade-in': isVisible,
            'animate-fade-out': !isVisible,
          },
        )}
      >
        <div
          style={{ '--CustomWidth': size } as CSSProperties}
          className={cn('flex w-[--CustomWidth] flex-col gap-8 rounded-md bg-white p-8', {
            'animate-scale-in': isVisible,
            'animate-scale-out': !isVisible,
          })}
        >
          <header className="flex justify-between">
            <h1 className="text-2xl font-bold">{title}</h1>

            <button onClick={onClose}>
              <CloseIcon className="w-8" />
            </button>
          </header>

          {children}

          {(onCancel || onConfirm) && (
            <footer
              className={cn('flex items-center', {
                'justify-between': onCancel && onConfirm,
                'justify-end': !onCancel && onConfirm,
              })}
            >
              {onCancel && (
                <Button type="button" onClick={onCancel} style="cancel">
                  {cancelLabel}
                </Button>
              )}
              {onConfirm && (
                <Button
                  type="button"
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

