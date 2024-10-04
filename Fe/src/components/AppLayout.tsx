import { Outlet } from 'react-router-dom';
import { SideBar } from './SideBar';

export function AppLayout() {
  return (
    <div className='flex'>
      <SideBar/>
      <Outlet/>
    </div>
  );
}
