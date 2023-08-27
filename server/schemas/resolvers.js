const stripe = require('stripe')(process.env.STRIPE_SECRET);
const { User, Book, Category, Order, SellPost } = require('../models');
const { signToken, AuthenticationError } = require('../utils');

const resolvers = {
  Query: {
    categories: async () => await Category.find(),
    currentUser: async (parent, { email }) => User.findOne({ email }),
    books: async (parent, { category, name }) => {
      const params = {};
      if (category) {
        params.category = category;
      }
      if (name) {
        params.name = {
          $regex: name,
        };
      }
      return await Book.find(params).populate('category');
    },
    book: async (parent, { _id }) => {
      await Book.findById(_id).populate('category');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.books',
          populate: 'category',
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw AuthenticationError;
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      await Order.create({ books: args.books.map(({ _id }) => _id) });
      // eslint-disable-next-line camelcase
      const line_items = [];

      // eslint-disable-next-line no-restricted-syntax
      for (const book of args.books) {
        line_items.push({
          price_data: {
            currency: 'usd',
            book_data: {
              name: book.name,
              description: book.description,
              images: [`${url}/images/${book.image}`],
            },
            unit_amount: book.price * 100,
          },
          quantity: book.purchaseQuantity,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
  },

  Mutation: {
    register: async (
      parent,
      { firstName, lastName, email, password, shippingAddress }
    ) => {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        shippingAddress,
      });
      const token = signToken(user);
      return { token, currentUser: user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, currentUser: user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw AuthenticationError;
    },
    addOrder: async (parent, { books }, context) => {
      if (context.user) {
        const order = new Order({ books });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
      }

      throw AuthenticationError;
    },
    addBook: async (parent, { title, isbn, condition, listedPrice, userEmail }, context) => {
      const book = await Book.create({
        title,
        isbn,
        condition,
        listedPrice,
        userEmail,
      });
      return Book;
    },
    updateBook: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await book.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
