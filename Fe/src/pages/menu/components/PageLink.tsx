import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../../utils/cn';

type PageLinkProps = {
  to: string;
  label: string;
}

export function PageLink({ to, label }: PageLinkProps) {
  const { pathname } = useLocation();
  const adress = `/menu/${to}`;

  return (
    <Link to={adress} className={cn('py-4 px-10', {
      'font-bold text-red-main bg-white': pathname.includes(to)
    })}>
      {label}
    </Link>
  );
}
