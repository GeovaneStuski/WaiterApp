import Logo from '../assets/Images/Logo.svg';
import { cn } from '../utils/cn';
import { useUnmount } from '../hooks/useUnmount';

type SplashProps = {
  isVisible: boolean;
};

export function Splash({ isVisible }: SplashProps) {
  const { itemRef, shouldBeRender } = useUnmount(isVisible);

  return (
    <>
      {shouldBeRender && (
        <div
          ref={itemRef}
          className={cn(
            'fixed left-0 top-0 z-10 flex h-screen w-screen flex-col items-center justify-center bg-red-main text-white',
            {
              'animate-fade-out': !isVisible,
            },
          )}
        >
          <img src={Logo} alt="Logo" />

          <h1 className="mt-6 text-4xl font-bold">
            WAITER
            <span className="ml-1 font-light">APP</span>
          </h1>

          <span className="mt-2 text-lg font-semibold">O App do Garçom</span>
        </div>
      )}
    </>
  );
}

