import './App.css';
import SidebarMenu from './components/SidebarMenu/SidebarMenu';
import EventCatalog from './views/EventCatalog';
import ScheduledEvents from './views/ScheduledEvents';

function App() {
  return (
    <div className="App">
      <SidebarMenu></SidebarMenu>
      <ScheduledEvents></ScheduledEvents>    
    </div>
  );
}

export default App;
