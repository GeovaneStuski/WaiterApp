import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../../utils/cn';

type ItemContainerProps = {
  title: string;
  icon: React.ElementType;
  path: string;
}

export function ItemContainer({title, icon: Icon, path}: ItemContainerProps) {
  const { pathname } = useLocation();

  if(pathname.includes('menu') && path === '/menu/products') {
    path = pathname;
  }

  return (
    <Link to={path} className={cn('flex flex-col gap-2 items-center font-semibold', {
      'text-red-main hover-side': path === pathname
    })}>
      <Icon className='w-7'/>
      <span>{title}</span>
    </Link>
  );
}
