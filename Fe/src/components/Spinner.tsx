import { CSSProperties } from 'react';

type SpinnerProps = {
  size?: number;
};

export function Spinner({ size = 32 }: SpinnerProps) {
  return (
    <div
      className="w-[--CustomWidth] h-[--CustomWidth] rounded-full animate-spin"
      style={{
        '--CustomWidth': `${size}px`,
        boxShadow: `0 ${(size * (size > 32 ? 3 : 4.5)) / 100}px 0 #D73035`,
      } as CSSProperties}
    />
  );
}
