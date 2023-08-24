require('dotenv').config();
const books = require('./books.json');
// const key = 'AIzaSyDlgXw70RuX1xaT6ZJoBhx97I1ASi_xCgE';

module.exports = async () => {
  const bookApiKey = process.env.BOOK_API_KEY;
  const url = 'https://www.googleapis.com/books/v1/volumes';
  const retrievedBooks = [];
  for (let book of books){
    res = await fetch(`${url}/?key=${bookApiKey}&q=${book.title}+isbn:${book.isbn}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await res.json();
    if (data.totalItems == 0 || data.totalItems > 1){
      throw new Error(`expecting 1 item for isbn ${book.isbn}, instead got ${data.totalItems}`);
    }
    const retrievedBook = data.items[0];
    retrievedBook.userEmail = book.userEmail;
    retrievedBook.listedPrice = book.listedPrice;
    console.log(JSON.stringify(retrievedBook.volumeInfo.title + ' listed by ' + retrievedBook.userEmail + ' for ' + retrievedBook.listedPrice.amount + ' ' + retrievedBook.listedPrice.currencyCode));
    retrievedBooks.push(retrievedBook);
  }
  return retrievedBooks;
};