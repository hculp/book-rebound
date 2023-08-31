import SidebarComponent from '../components/Sidebar';
import NewListingModal from '../components/NewListingModal';
import React, { useState } from 'react';
import { useQuery } from  '@apollo/client';
import { QUERY_BOOKS_FOR_USER } from '../graphql/queries';

import { useCurrentUserContext } from "../context/CurrentUser";

function UserBooks() {
  //if current's email matches any email in the book database, load that book
  const {currentUser} = useCurrentUserContext();
  const userEmail = currentUser.email;
  console.log(`userEmail: ${JSON.stringify(userEmail)}`);
  const { loading, error, data } = useQuery(QUERY_BOOKS_FOR_USER, {
    variables: {userEmail}
  });
  if(loading){
    return
      <div>
        Loading...
      </div>
  }
  if (error){
    return
      <div>
        Error: {error.message}
      </div>
  }

  return (
    <div>
      <h3>Books owned by {userEmail}</h3>
      {
        data.books.map((book, index) => (
          <div key={index} style={{marginBottom: 10, backgroundColor: 'lightGreen'}}>
            <div>Title: {book.title}</div>
            <div>Condition: {book.condition}</div>
            <div>Price: ${book.listedPrice}</div>
          </div>
        ))
      }
    </div>
  )
}

export default UserBooks

// {
//   "books": [
//     {
//       "__typename": "Book",
//       "title": "f",
//       "isbn": "2",
//       "condition": "new",
//       "userEmail": "rhobbs@example.com",
//       "listedPrice": 2
//     }
//   ]
// }