import { useEffect, useRef, useState } from 'react';

export function useUnmount(isVisible: boolean) {
  const [shouldBeRender, setShouldBeRender] = useState(false);

  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function handleAnimationEnd() {
      setShouldBeRender(false);
    }

    if(!isVisible) {
      itemRef.current?.addEventListener('animationend', handleAnimationEnd);
    }

    if(isVisible) {
      setShouldBeRender(true);
    }
  }, [isVisible]);

  return {
    shouldBeRender,
    itemRef,
  };
}
