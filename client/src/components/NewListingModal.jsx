import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { QUERY_BOOKS } from '../graphql/queries';
import { ADD_BOOK } from '../graphql/mutations';

import { useCurrentUserContext } from '../context/CurrentUser';

//this will eventually need to have access to user data to get the user email
const NewListingModal = ({ isOpen, onClose }) => {
  const { currentUser } = useCurrentUserContext();
  const userEmail = currentUser.email;

  const [bookData, setBookData] = useState({
    title: '',
    isbn: '',
    condition: '',
    listedPrice: '',
    userEmail: userEmail,
  });

  const [addBook, { err }] = useMutation(ADD_BOOK, {
    refetchQueries: [QUERY_BOOKS, { query: QUERY_BOOKS }],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBookData({ ...bookData, [name]: value });
    console.log('change handleded');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(bookData);
      await addBook({ variables: { ...bookData } });
      console.log('New book listing created!');
    } catch (err) {
      console.log({ err });
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>List a Book to Sell</h1>
        <div>
          <label>Title (required):</label>
          <input
            type="text"
            name="title"
            placeholder="Enter the title of your book"
            value={bookData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>ISBN</label>
          <input
            type="number"
            name="isbn"
            placeholder="Enter the ISBN of your book"
            value={bookData.isbn}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>
            Please select the condition of your book (note: listed books must be
            in one piece and be readable)
          </label>
          <select
            name="condition"
            value={bookData.condition}
            onChange={handleChange}
          >
            <option value=" ">Select your book's condition:</option>
            <option value="new">New</option>
            <option value="lightly-worn">Lightly worn</option>
            <option value="moderately-worn">Moderately worn</option>
            <option value="severely-worn">Severely worn</option>
          </select>
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="listedPrice"
            placeholder="Enter a price for your book:"
            value={bookData.listedPrice}
            onChange={handleChange}
          />
        </div>
        <button className="bg-forestfront-50 hover:bg-forestback-50 m-1 p-1" type="submit">List your book!</button>
        <button className='bg-forestfront-50 hover:bg-forestback-50 m-1 p-1' onClick={onClose} type="button">
          Close
        </button>
      </form>
    </div>
  );
};

export default NewListingModal;
