import { Outlet } from 'react-router-dom';
import { PagesHeader } from '../../components/PagesHeader';
import { MenuIcon } from '../../components/Icons/MenuIcon';
import { motion } from 'framer-motion';
import { PageLink } from './components/PageLink';

export function Menu() {
  return (
    <motion.div
      className='w-full px-20 mt-10'
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
    >
      <PagesHeader
        icon={MenuIcon}
        page='Cardápio'
        description='Gerencie os produtos do seu estabelecimento'
      />

      <div className='mt-6 mb-8 text-sm'>
        <div className='flex'>
          <PageLink label='Produtos' to='products'/>

          <PageLink label='Categorias' to='categories'/>

          <PageLink label='Ingredientes' to='ingredients'/>
        </div>

        <hr className='border-gray-light/40'/>
      </div>

      <Outlet/>
    </motion.div>
  );
}
