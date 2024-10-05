import { Spinner } from './Spinner';
import { ReactPortals } from './ReactPortals';
import { useUnmount } from '../hooks/useUnmount';
import { cn } from '../utils/cn';

type LoaderProps = {
  isVisible: boolean;
}

export function Loader({ isVisible }: LoaderProps) {
  const { itemRef, shouldBeRender } = useUnmount(isVisible);

  if(!shouldBeRender) return;
  return (
    <ReactPortals containerId="loader-root">
      <div ref={itemRef} className={cn('fixed w-screen h-screen top-0 left-0 bg-white/40 flex justify-center items-center backdrop-blur-[1.5px]', {
        'animate-fade-out': !isVisible,
        'animate-fade-in': isVisible
      })}>
        <Spinner size={80}/>
      </div>
    </ReactPortals>
  );
}
