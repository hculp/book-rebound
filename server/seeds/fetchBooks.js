require('dotenv').config();
const books = require('./books.json');
const key = 'AIzaSyDlgXw70RuX1xaT6ZJoBhx97I1ASi_xCgE';

module.exports = async () => {
  // const bookApiKey = process.env.BOOK_API_KEY;
  const url = 'https://www.googleapis.com/books/v1/volumes';
  const retrievedBooks = [];
  for (let book of books){
    res = await fetch(`${url}/?key=${key}&q=${book.title}+isbn:${book.isbn}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await res.json();
    const retrievedBook = data.items[0];

    book.description = retrievedBook.volumeInfo.description;

    retrievedBooks.push(book);
  }
  return retrievedBooks;
};