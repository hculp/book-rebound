import { gql } from "@apollo/client";

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
  mutation register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $shippingAddress: ShippingAddressInfo!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      shippingAddress: $shippingAddress
    ) {
      currentUser {
        firstName
        lastName
      }
      token
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($_id: ID!) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      shippingAddress: $shippingAddress
    ) {
      firstName
      lastName
      email
      password
      shippingAddress {
        address
        city
        state
        postalCode
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $isbn: String!
    $condition: String!
    $userEmail: String!
    $listedPrice: String!
  ) {
    addBook(
      title: $title
      isbn: $isbn
      condition: $condition
      userEmail: $userEmail
      listedPrice: $listedPrice
    ) {
      title
      isbn
      condition
      userEmail
      listedPrice
    }
  }
`;
