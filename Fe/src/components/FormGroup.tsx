import { ReactNode } from 'react';

import { motion } from 'framer-motion';

type FormGroupProps = {
  children: ReactNode;
  error?: string;
}

export function FormGroup({children, error}: FormGroupProps) {
  return (
    <div className='flex-col gap-1 flex'>
      {children}
      {error && (
        <motion.span
          className='text-red-main text-sm'
          initial={{opacity: 0}}
          animate={{opacity: 1}}
        >
          {error}
        </motion.span>
      )}
    </div>
  );
}
