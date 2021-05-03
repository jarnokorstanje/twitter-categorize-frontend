# twitter-categorize-frontend

App is deployed at Netlify: https://hopeful-colden-3b1401.netlify.app/

Node.js backend here: https://github.com/jarnokorstanje/twitter-categorize 


## Properties of the app:

- React app with Bootstrap components
- Authenticated mutations
- SSL (HTTPS)
- Displays tweets with react-twitter-widgets: https://www.npmjs.com/package/react-twitter-widgets


## User functionality:

- Register page to create a user
- Login page to get Bearer Token and store in localstorage
- Logout button to delete Bearer Token from localstorage
- Profile page to see user details
- If not logged in, every page except register will redirect to login page


## CRUD functionality (categories):

- Add page to create categories (handles input is scalable, use add/remove buttons)
- Categories page shows categories made by the user
- Edit page to update or delete category


## Example requests:

Backend server live at: https://node152605-jakor-mongo-node.jelastic.metropolia.fi

(Requests can be sent with Postman)


### Register new user

POST request to `/register`

JSON body:
```json
{
    "username": "<username>",
    "password": "<password>"
}
```


### Login for getting Bearer Token
    
POST request to `/login`

JSON body:
```json
{
    "username": "<username>",
    "password": "<password>"
}
```


### Get all categories

POST request to `/graphql`

Body:
```graphql
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
}
```


### Get categories by user

POST request to `/graphql`

Body:
```graphql
{
  categories(userId: "<userId>") {
    id
    userId
    title
    accounts {
      id
      handle
    }
  }
}
```


### Get category by ID

POST request to `/graphql`

Body:
```graphql
{
  category(id: "<categoryId>") {
    id
    userId
    title
    accounts {
      id
      handle
    }
  }
}
```


### Add category 

POST request to `/graphql` (Remember to add Bearer Token in Authorization)

Body:
```graphql
mutation {
  addCategory(
    userId: "<userId>"
    title: "<titlename>",
    accounts: [
      {
        handle: "<handle>"
      },
      {
        handle: "<handle2>"
      }
    ]
  )
  {
    id
    userId
    title
    accounts {
      id
      handle
    }
  }
}
```


### Add category (separate variables)

POST request to `/graphql` (Remember to add Bearer Token in Authorization)

Body:
```graphql
mutation addCategory($userId: String!, $title: String!, $accounts: [NewAccounts]) {
  addCategory(
    userId: $userId,
    title: $title,
    accounts: $accounts
  )
  {
    id
    userId
    title
    accounts {
      id
      handle
    }
  }
}
```

GraphQL variables (JSON):
```
{
    "userId": "<userId>",
    "title":"<title>",
    "accounts":[
        {
            "handle":"<@handle>"
        }
    ]
}
```


### Modify category

POST request to `/graphql` (Remember to add Bearer Token in Authorization)

Body:
```graphql
mutation {
    modifyCategory(    
      id: "<categoryId>",
      UserId: "<userId>"
      Title: "<titlename>",
      Accounts: [
        {
          Handle: "<handle>"
        },
        {
          Handle: "<handle2>"
        }
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
```

GraphQL variables (JSON):
```
{
    "userId": "<userId>",
    "title":"<title>",
    "accounts":[
        {
            "handle":"<@handle>"
        }
    ]
}
```


### Modify category (separate variables)

POST request to `/graphql` (Remember to add Bearer Token in Authorization)

Body:
```graphql
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
```

GraphQL variables (JSON):
```
{
    "id": "<categoryId>",
    "userId": "<userId>",
    "title": "<title>",
    "accounts": [
      {
        "handle":"<@handle>"
      }
    ]
}
```


### Delete category

POST request to `/graphql` (Remember to add Bearer Token in Authorization)

Body:
```graphql
mutation
{
	deleteCategory(id: "<categoryId>")
}
```


### Delete category (separate variables)

POST request to `/graphql` (Remember to add Bearer Token in Authorization)

Body:
```graphql
mutation deleteCategory($id: ID!) {
  deleteCategory(id: $id)
}
```

GraphQL variables (JSON):
```
{
  "id": "<categoryId>"
}
```