import axios from 'axios';
import { print } from 'graphql';
import gql from 'graphql-tag';
import authHeader from './authHeader.js';

const API_URL = 'https://node152605-jakor-mongo-node.jelastic.metropolia.fi/graphql';

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
              id
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
              id
              handle
            }
          }
        }`
      }
    );
  }

  create(newCategory) {
    let accountsQuery = "";

    newCategory.Accounts.forEach(function (account) {
      accountsQuery = accountsQuery.concat(`{Handle: "${account.Handle}"},`);
    });

    return axios.post(
      API_URL,
      {
        query: `
        {
          mutation addCategory(
              UserId: "Jarno"
              Title: "${newCategory.Title}",
              Accounts: [
                ${accountsQuery}
              ]
            )
            {
              id
              UserId
              Title
              Accounts {
                id
                Handle
              }
            }
          }
        }`
      },
      { headers: authHeader() }
    );

    // console.log(
    //   {
    //     query: `
    //     {
    //       mutation addCategory(
    //           UserId: "Jarno"
    //           Title: "${newCategory.Title}",
    //           Accounts: [
    //             ${accountsQuery}
    //           ]
    //         )
    //         {
    //           id
    //           UserId
    //           Title
    //           Accounts {
    //             id
    //             Handle
    //           }
    //         }
    //       }
    //     }`
    //   }
    // );
  }

  // update(id, data) {
  //   return axios.post(
  //     API_URL, 
  //     { query: `
  //       {

  //       }`
  //     }
  //   );
  // }

  // delete(id) {
  //   return axios.post(
  //     API_URL, 
  //     { query: `
  //       {

  //       }`
  //     }
  //   );
  // }
}

export default new CategoryService();