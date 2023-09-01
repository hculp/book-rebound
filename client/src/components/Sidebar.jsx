'use client';

import { Link } from 'react-router-dom';
import { useCurrentUserContext } from '../context/CurrentUser';
import { Sidebar } from 'flowbite-react';
import { useState } from 'react';
import NewListingModal from './NewListingModal';
import Cart from '../components/cart';

export default function SidebarComponent() {
  const { isLoggedIn, logoutUser } = useCurrentUserContext();

  // For opening the modal to list a new book
  const [isNewListingOpen, setNewListingOpen] = useState(false);
  const openNewListingModal = () => {
    setNewListingOpen(true);
  };
  const closeNewListingModal = () => {
    setNewListingOpen(false);
  };

  return (
    <div className="bg-forestback-50 p-2">
      <div className="bg-forestfront-50 rounded border-black flex flex-auto max-w-lg p-2">
        <Sidebar className=" bg-forestback-50 flex flex-auto max-w-lg">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item className="bg-forestfront-50 hover:bg-forestback-50">
                <p>My purchases</p>
              </Sidebar.Item>
              <Sidebar.Item className="bg-forestfront-50 hover:bg-forestback-50">
                <Link to="/UpdateUser">User Profile</Link>
              </Sidebar.Item>
              <Sidebar.Item className="bg-forestfront-50 hover:bg-forestback-50">
                <button onClick={openNewListingModal}>List New Book</button>
              </Sidebar.Item>
              <Sidebar.Item className="bg-forestfront-50 hover:bg-forestback-50">
                <Cart />
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
          <NewListingModal
            isOpen={isNewListingOpen}
            onClose={closeNewListingModal}
          />
        </Sidebar>
      </div>
    </div>
  );
}
