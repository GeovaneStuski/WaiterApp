import Logo from '../assets/Images/Logo.svg';
import { cn } from '../utils/cn';
import { useUnmount } from '../hooks/useUnmount';

type SplashProps = {
  isVisible: boolean
};

export function Splash({ isVisible }: SplashProps) {
  const { itemRef, shouldBeRender } = useUnmount(isVisible);

  return (
    <>
      {shouldBeRender && (
        <div ref={itemRef} className={cn('h-screen w-screen fixed bg-red-main flex justify-center items-center flex-col text-white', {
          'animate-fade-out': !isVisible,
          'animate-fade-in': isVisible,
        })}>
          <img src={Logo} alt="Logo" />
          <h1 className='text-4xl font-bold mt-6'>
          WAITER
            <span className='ml-1 font-light'>APP</span>
          </h1>
          <span className='mt-2 font-semibold text-lg'>O App do Garçom</span>
        </div>
      )}
    </>
  );
}
