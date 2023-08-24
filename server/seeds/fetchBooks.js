// const models = require('../models');
// const db = require('../config/connection');
const books = require('./books.json');

module.exports = async () => {
  const url = 'https://www.googleapis.com/books/v1/volumes';
  const key = 'AIzaSyDlgXw70RuX1xaT6ZJoBhx97I1ASi_xCgE'
  //put that in the .env

  const retrievedBooks = [];

  for (let book of books){
    res = await fetch(`${url}/?key=${key}&q=${book.title}+isbn:${book.isbn}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await res.json();
    if (data.totalItems !== 1){
      throw new Error(`expecting 1 item for isbn ${book.isbn}, instead got ${data.totalItems}`);
    }
    const retrievedBook = data.items[0];
    retrievedBook.userEmail = book.userEmail;
    console.log(JSON.stringify(retrievedBook));
    retrievedBooks.push(retrievedBook);
  }
  return retrievedBooks;
};