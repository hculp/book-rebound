import SidebarComponent from '../components/Sidebar';
import SearchComponent from '../components/SearchBar';

function Dashboard() {
  return (
    <div>
      <SearchComponent />
      <h1 className="page-title">Dashboard</h1>
      <SidebarComponent />
    </div>
  );
}

export default Dashboard;
