import { CSSProperties } from 'react';

type SpinnerIconProps = {
  size?: number;
};

export function SpinnerIcon({ size = 80 }: SpinnerIconProps) {
  return (
    <div
      className="box-border inline-block h-[--CustomSize] w-[--CustomSize] animate-loader rounded-full border-red-main duration-500"
      style={
        {
          '--CustomSize': `${size}px`,
          borderRightWidth: `${size < 32 ? 1 : 2}px`,
          borderTopWidth: `${size < 32 ? 1 : 2}px`,
        } as CSSProperties
      }
    />
  );
}
