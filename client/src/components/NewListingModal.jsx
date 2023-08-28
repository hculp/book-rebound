import React, { useState } from 'react';

//this will eventually need to have access to user data to get the user email
const NewListingModal = ({isOpen, onClose}) => {
  if(!isOpen){
    return null;
  }
  const [bookData, setBookData] = useState({
    title: "",
    isbn: "",
    condition: "",
    listedPrice: "",
    userEmail: "captainmarvel@example.com",
    //this email is just for now
  });
  
  const handleChange = (event) => {
    const{name, value} = event.target;
    setBookData( (current) => {
      const newValue = {
        title: current.title,
        isbn: current.isbn,
        condition: current.condition,
        listedPrice: current.listedPrice,
        userEmail: current.userEmail,
      }
      newValue[name] = value;
      return newValue;
    });
  };
  
//👷‍♀️🔶road work ahead vvvvvvvvvvv

  const [addBook, { error }] = useMutation(ADD_BOOK);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await addBook
    }
    //await graphql operation
    console.log(JSON.stringify(bookData));
  }
//
//👷‍♀️🔶road work ends^^^^^^^^^^^
//

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>List a Book to Sell</h1>
        <div>
          <label>Title (required):</label>
          <input type="text" name="title" placeholder="Enter the title of your book"
          value={bookData.title} onChange={handleChange} />
        </div>
        <div>
          <label>ISBN</label>
          <input type="number" name="isbn" placeholder="Enter the ISBN of your book" 
          value={bookData.isbn} onChange={handleChange} />
        </div>
        <div>
          <label>Please select the condition of your book (note: listed books must be in one piece and be readable)</label>
          <select name="condition" value={bookData.condition} onChange={handleChange}>
            <option value="selected">Select your book's condition:</option>
            <option value="new">New</option>
            <option value="lightly-worn">Lightly worn</option>
            <option value="moderately-worn">Moderately worn</option>
            <option value="severely-worn">Severely worn</option>
          </select> 
        </div>
        <div>
          <label>Price</label>
          <input type="number" name="listedPrice" placeholder="Enter a price for your book:"
          value={bookData.listedPrice} onChange={handleChange} />
        </div>
        <button type="submit">List your book!</button>
        <button onClick={onClose} type="button">Cancel</button>
      </form>
    </div>
  );
};

export default NewListingModal;