'use client';
import { useState } from 'react';
import { Pagination } from 'flowbite-react';

export default function SearchPagination() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Pagination
      currentPage={1}
      onPageChange={(page) => {
        setCurrentPage(page);
      }}
      totalPages={100}
    />
  );
}
