import axios from 'axios';
import { print } from 'graphql';
import gql from 'graphql-tag';
import authHeader from './authHeader.js';

const API_URL = 'https://node152605-jakor-mongo-node.jelastic.metropolia.fi/graphql';

const ADD_CATEGORY = gql`
mutation addCategory($userId: String!, $title: String!, $accounts: [NewAccounts]) {
  addCategory(userId: $userId, title: $title, accounts: $accounts) {
    id
    userId
    title
    accounts {
      id
      handle
    }
  }
}
`

const MODIFY_CATEGORY = gql`
mutation modifyCategory($id: ID!, $userId: String!, $title: String!, $accounts: [NewAccounts]) {
  modifyCategory(id: $id, userId: $userId, title: $title, accounts: $accounts) {
    id
    userId
    title
    accounts {
      id
      handle
    }
  }
}
`

const DELETE_CATEGORY = gql`
mutation deleteCategory($id: ID!) {
  deleteCategory(id: $id)
}
`

class CategoryService {
  getAll() {
    return axios.post(
      API_URL,
      {
        query: `
        {
          categories {
            id
            userId
            title
            accounts {
              handle
            }
          }
        }`
      }
    );
  }

  getByUser(userId) {
    return axios.post(
      API_URL,
      {
        query: `
        {
          categories(userId: "${userId}") {
            id
            userId
            title
            accounts {
              handle
            }
          }
        }`
      }
    );
  }

  get(id) {
    return axios.post(
      API_URL,
      {
        query: `
        {
          category(id: "${id}") {
            id
            userId
            title
            accounts {
              handle
            }
          }
        }`
      }
    );
  }

  create(newCategory, currentUser) {
    return axios.post(
      API_URL,
      {
        query: print(ADD_CATEGORY),
        variables: {
          "userId": currentUser.user._id,
          "title": newCategory.title,
          "accounts": newCategory.accounts
        }
      },
      { headers: authHeader() }
    );
  }

  update(currentCategory, currentUser) {
    console.log('model ' + currentCategory.id);
    return axios.post(
      API_URL,
      {
        query: print(MODIFY_CATEGORY),
        variables: {
          "id": currentCategory.id,
          "userId": currentUser.user._id,
          "title": currentCategory.title,
          "accounts": currentCategory.accounts
        }
      },
      { headers: authHeader() }
    );
  }

  delete(id) {
    return axios.post(
      API_URL,
      {
        query: print(DELETE_CATEGORY),
        variables: {
          "id": id
        }
      },
      { headers: authHeader() }
    );
  }
}

export default new CategoryService();