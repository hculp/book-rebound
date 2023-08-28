import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    currentUser {
      email
      firstName
      lastName
      _id
    }
    token
  }
}
`;

export const REGISTER_USER = gql`
mutation register($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  register(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
    currentUser {
      firstName
      lastName
    }
    token
  }
}
`;

export const ADD_BOOK = gql`
mutation add($title: String!, $isbn: String!, $condition: String! $description: String!, $userEmail: String!, $listedPrice: Number, $category: Schema.Types.ObjectId) {
  add($title: String!, $isbn: String!, $condition: String! $description: String!, $userEmail: String!, $listedPrice: Number, $category: Schema.Types.ObjectId) {
    currentUser{
      email
    }
    token
  }
}
`;

//is the currentUser thing correct?