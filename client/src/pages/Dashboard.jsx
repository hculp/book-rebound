import SidebarComponent from '../components/Sidebar';
import UserBooks from '../components/UserBooks';
import SearchComponent from '../components/SearchBar';

import NewListingModal from '../components/NewListingModal';
import React, { useState } from 'react';
import Cart from '../components/cart';
function Dashboard() {
  return (
    <div>
      <SearchComponent />
      <h1 className="page-title">Dashboard</h1>
      <SidebarComponent />
      <UserBooks />
      <button onClick={openNewListingModal}>List New Book</button>
      <NewListingModal isOpen={isNewListingOpen} onClose={closeNewListingModal} />
      <Cart />
    </div>
  );
}

export default Dashboard;
