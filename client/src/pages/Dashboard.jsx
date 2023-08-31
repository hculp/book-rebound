import SidebarComponent from '../components/Sidebar';
import NewListingModal from '../components/NewListingModal';
import React, { useState } from 'react';
import UserBooks from '../components/userBooks';

function Dashboard() {
  const [isNewListingOpen, setNewListingOpen] = useState(false);
  const openNewListingModal = () => {
    setNewListingOpen(true);
  };
  const closeNewListingModal = () => {
    setNewListingOpen(false);
  };
  return (
    <div>
      <SearchComponent />
      <h1 className="page-title">Dashboard</h1>
      <SidebarComponent />
      <button onClick={openNewListingModal}>List New Book</button>
      <UserBooks />
      <NewListingModal
        isOpen={isNewListingOpen}
        onClose={closeNewListingModal}
      />
    </div>
  );
}

export default Dashboard;
