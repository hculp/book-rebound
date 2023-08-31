import SidebarComponent from '../components/Sidebar';
import UserBooks from '../components/userBooks';
import SearchComponent from '../components/SearchBar';

function Dashboard() {

  return (
    <div>
      <SearchComponent />
      <h1 className="page-title">Dashboard</h1>
      <SidebarComponent />
      <UserBooks />
    </div>
  );
}

export default Dashboard;
