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
        <div ref={itemRef} className={cn('h-screen w-screen top-0 left-0 fixed bg-red-main flex justify-center items-center flex-col text-white z-10', {
          'animate-fade-out': !isVisible,
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
