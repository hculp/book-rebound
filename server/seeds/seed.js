const db = require('../config/connection');
const { Book, User } = require('../models');
const cleanDB = require('./cleanDB');
const fetchBooks = require('./fetchBooks');
const users = require('./users.json');

db.once('open', async () => {
  
  const books = await fetchBooks();

  await cleanDB('Book', 'books');

  await Book.insertMany(books);

  await cleanDB('User', 'users');

  await User.insertMany(users);

  console.log('Users seeded!');
  process.exit(0);
});

