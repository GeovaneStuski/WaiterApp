import { HistoryIcon } from '../Icons/HistoryIcon';
import { HomeIcon } from '../Icons/HomeIcon';
import { LogoutIcon } from '../Icons/LogoutIcon';
import { MenuIcon } from '../Icons/MenuIcon';
import { ProfileIcon } from '../Icons/ProfileIcon';
import { SideBarLogo } from '../Icons/SideBarLogo';
import { UserIcon } from '../Icons/UserIcon';
import { ItemContainer } from './components/ItemContainer';

export function SideBar() {
  return (
    <div className="w-28 bg-white h-screen shadow-side-bar flex flex-col items-center py-10 text-gray-main justify-between">
      <SideBarLogo className='w-12'/>

      <div className='space-y-6'>
        <ItemContainer
          title='Home'
          icon={HomeIcon}
          path='/'
        />

        <ItemContainer
          title='Historico'
          icon={HistoryIcon}
          path='/history'
        />

        <ItemContainer
          title='Cardapio'
          icon={MenuIcon}
          path='/menu/products'
        />

        <ItemContainer
          title='Usuarios'
          icon={UserIcon}
          path='/users'
        />
      </div>

      <div className='space-y-6'>
        <ItemContainer
          title='Perfil'
          icon={ProfileIcon}
          path='/profile'
        />

        <div className="flex flex-col gap-2 items-center font-semibold">
          <LogoutIcon className='w-7'/>
          <span>Sair</span>
        </div>
      </div>
    </div>
  );
}
