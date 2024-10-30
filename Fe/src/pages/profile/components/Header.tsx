import { EditIcon } from '../../../components/Icons/EditIcon';
import { ProfileIcon } from '../../../components/Icons/ProfileIcon';
import { User } from '../../../types/User';

type HeaderProps = {
  user: User | null;
}

export function Header({user}: HeaderProps) {
  return (
    <header className='flex justify-between items-center'>
      <div className='flex items-center gap-1'>
        <EditIcon className='w-7'/>

        <h1 className='font-bold text-xl'>Editar seu Perfil</h1>
      </div>

      <div className='flex gap-1 text-red-main text-sm items-center'>
        <ProfileIcon className='w-6'/>

        <span className='capitalize font-bold'>{user?.name}</span>
      </div>
    </header>
  );
}
