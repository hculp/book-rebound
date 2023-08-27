import React, { useState } from 'react';
//will need this on dash to get modal to work

import SearchComponent from '../components/SearchBar';
import BookCard from '../components/BookCard';
import SearchPagination from '../components/Pagination';
import NewListingModal from '../components/NewListingModal';

function Landing() {
// This needs to be moved to Dashboard once login is fixed
  const [ isNewListingOpen, setNewListingOpen ] = useState (false);
  const openNewListingModal = () => {
    setNewListingOpen (true);
  };
  const closeNewListingModal = () => {
    setNewListingOpen (false);
  };
  // 
  return (
    <div className="bg-forestback-50">
      <SearchComponent />
      <div className="grid grid-cols-3 p-4">
      <BookCard />
      <BookCard />
      <BookCard />
      <SearchPagination />
      </div>
      {/* <h1 className="page-title text-4xl">Landing</h1>
      <p className="text-3xl underline">Test element!</p>
      <p className="border border-3 rounded-xl">Another test</p> */}
      <button onClick={openNewListingModal}>List New Book</button>
      <NewListingModal isOpen={isNewListingOpen} onClose={closeNewListingModal} />
    </div>
  )
}

export default Landing;