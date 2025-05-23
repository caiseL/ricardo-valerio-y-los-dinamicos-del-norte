import '../css/ClientPage.css';

import { Outlet } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu/SidebarMenu';

function ClientPage() {

  return (
    <div className="client-page">
      <SidebarMenu></SidebarMenu>
      <Outlet/>
    </div>
  );
}

export default ClientPage;
