const typeDefs = `#graphql
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    orders: [Order]
  }

  type Category {
    _id: ID
    name: String
  }

  type Book {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    books: [Book]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID!
    currentUser: User
  }

  type SellPost {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  input BookInput {
    _id: ID
    purchaseQuantity: Int
    name: String
    image: String
    price: Float
    quantity: Int
  }

  type Query {
    currentUser(email: String!): User
    categories: [Category]
    books(category: ID, name: String): [Book]
    book(_id: ID!): Book
    order(_id: ID!): Order
    checkout(books: [BookInput]!): Checkout
  }

  type Mutation {
    register(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addOrder(books: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateBook(_id: ID!, quantity: Int!): Book
  }
`;

module.exports = typeDefs;
