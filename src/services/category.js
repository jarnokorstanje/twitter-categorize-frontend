import api from "./api";

class CategoryService {
  getAll() {
    return api.post(
      "/", 
      { query: `
        {
          categories {
            id
            UserId
            Title
            Accounts {
              id
              Handle
            }
          }
        }`
      }
    );
  }

  get(id) {
    return api.post(
      "/", 
      { query: `
        {
          category(id: "${id}") {
            id
            UserId
            Title
            Accounts {
              id
              Handle
            }
          }
        }`
      }
    );
  }

  // create(data) {
  //   return api.post(
  //     "/", 
  //     { query: `
  //       {
          
  //       }`
  //     }
  //   );
  // }

  // update(id, data) {
  //   return api.post(
  //     "/", 
  //     { query: `
  //       {
          
  //       }`
  //     }
  //   );
  // }

  // delete(id) {
  //   return api.post(
  //     "/", 
  //     { query: `
  //       {
          
  //       }`
  //     }
  //   );
  // }
}

export default new CategoryService();