import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const QUERY_CURRENT_USER = gql`
  query getCurrentUser($email: String!) {
    currentUser(email: $email) {
      _id
      email
      firstName
      lastName
    }
  }
`;

export const QUERY_BOOKS = gql`
  query getBooks {
      books {
        title
        isbn
        condition
        userEmail
        listedPrice
      }
    }
`;

export const QUERY_BOOKS_FOR_USER = gql`
query getBooksForUser($userEmail: String!) {
  books(userEmail: $userEmail) {
    _id
    title
    isbn
    condition
    userEmail
    listedPrice
  }
}
`;