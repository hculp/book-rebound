import SidebarComponent from '../components/Sidebar';
import NewListingModal from '../components/NewListingModal';
import React, { useState } from 'react';
import Cart from '../components/cart';

function Dashboard() {
    //
  //
  // This needs to be moved to Dashboard once login is fixed
  const [ isNewListingOpen, setNewListingOpen ] = useState(false);
  const openNewListingModal = () => {
    setNewListingOpen(true);
  };
  const closeNewListingModal = () => {
    setNewListingOpen (false);
  };
  //
  //
  // 
  return (
    <div>
      <h1 className="page-title">Dashboard</h1>
      <SidebarComponent />
      <button onClick={openNewListingModal}>List New Book</button>
      <NewListingModal isOpen={isNewListingOpen} onClose={closeNewListingModal} />
      <Cart />
    </div>
  )
}

export default Dashboard