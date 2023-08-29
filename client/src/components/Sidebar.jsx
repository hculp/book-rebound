'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import { useCurrentUserContext } from '../context/CurrentUser';
import { Sidebar } from 'flowbite-react';

export default function SidebarComponent() {
  const { isLoggedIn, logoutUser } = useCurrentUserContext();

  return (
    <div className="bg-forestfront-50 rounded border-black flex flex-auto max-w-md">
      {/* {isLoggedIn() ? (
                <>
                    <p>My purchases</p>
                    <p>User settings</p>
                </>
            ) : (
                <>
                   <p>Nothing</p>
                </>
            )} */}

      <Sidebar className="bg-forestfront-50">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item className="bg-forestfront-50 hover:bg-forestback-50">
              <p>My purchases</p>
            </Sidebar.Item>
            <Sidebar.Item className="bg-forestfront-50 hover:bg-forestback-50">
              <link to="/userProfile">User Profile</link>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
