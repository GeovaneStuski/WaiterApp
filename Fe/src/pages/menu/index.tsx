import { Link, Outlet, useLocation } from 'react-router-dom';
import { PagesHeader } from '../../components/PagesHeader';
import { MenuIcon } from '../../components/Icons/MenuIcon';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export function Menu() {
  const { pathname } = useLocation();
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
          <Link to='/menu/products' className={cn('py-4 px-10', {
            'font-bold text-red-main bg-white': pathname.includes('products')
          })}>
          Produtos
          </Link>

          <Link to='/menu/categories' className={cn('py-4 px-10', {
            'font-bold text-red-main bg-white': pathname.includes('categories')
          })}>
          Categories
          </Link>

          <Link to='/menu/ingredients' className={cn('py-4 px-10', {
            'font-bold text-red-main bg-white': pathname.includes('ingredients')
          })}>
          Ingredients
          </Link>
        </div>

        <hr className='border-gray-light/40'/>
      </div>

      <Outlet/>
    </motion.div>
  );
}
