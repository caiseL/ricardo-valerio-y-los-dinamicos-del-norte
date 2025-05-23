import './ClientPage.css';

import SidebarMenu from '../components/SidebarMenu/SidebarMenu';
import EventCatalog from './EventCatalog';
import ScheduledEvents from './ScheduledEvents';
import {useState} from 'react';

function ClientPage() {
  const [activeTab, setActiveTab] = useState('catalog');

  return (
    <div className="App">
      <SidebarMenu></SidebarMenu>
      {activeTab === 'catalog' && <EventCatalog></EventCatalog>}
      {activeTab === 'schedule' && <ScheduledEvents></ScheduledEvents>}  
    </div>
  );
}

export default ClientPage;
