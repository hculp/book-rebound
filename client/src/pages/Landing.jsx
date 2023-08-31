import React, { useState } from 'react';
//will need this on dash to get modal to work

import SearchComponent from '../components/SearchBar';
import BookCard from '../components/BookCard';
import SearchPagination from '../components/Pagination';
import NewListingModal from '../components/NewListingModal';

function Landing() {
  return (
    <div className="bg-forestback-50">
      <SearchComponent />
      <div className="grid grid-cols-3 p-4">
        <BookCard />
        <BookCard />
        <BookCard />
        <SearchPagination />
      </div>
    </div>
  );
}

export default Landing;
