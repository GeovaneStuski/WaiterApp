import { useContext } from 'react';
import { HistoryIcon } from '../Icons/HistoryIcon';
import { HomeIcon } from '../Icons/HomeIcon';
import { LogoutIcon } from '../Icons/LogoutIcon';
import { MenuIcon } from '../Icons/MenuIcon';
import { ProfileIcon } from '../Icons/ProfileIcon';
import { SideBarLogo } from '../Icons/SideBarLogo';
import { UserIcon } from '../Icons/UserIcon';
import { ItemContainer } from './components/ItemContainer';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';

export function SideBar() {
  const { user } = useContext(AuthenticationContext);
  
  return (
    <div className="flex h-screen w-28 flex-col items-center justify-between bg-white py-10 text-gray-main shadow-side-bar">
      <SideBarLogo className="w-12" />

      <div className="space-y-10">
        <ItemContainer title="Home" icon={HomeIcon} path="/" />

        <ItemContainer title="Historico" icon={HistoryIcon} path="/history" />

        <ItemContainer title="Cardapio" icon={MenuIcon} path="/menu/products" />

        {user?.position === 'admin' && <ItemContainer title="Usuarios" icon={UserIcon} path="/users" />}
      </div>

      <div className="space-y-10">
        <ItemContainer title="Perfil" icon={ProfileIcon} path="/profile" />

        <div className="flex flex-col items-center gap-2 font-semibold">
          <LogoutIcon className="w-7" />
          <span>Sair</span>
        </div>
      </div>
    </div>
  );
}

