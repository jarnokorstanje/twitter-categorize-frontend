# twitter-categorize-frontend

App is deployed at Netlify: https://hopeful-colden-3b1401.netlify.app/ 

Node.js backend here: https://github.com/jarnokorstanje/twitter-categorize 


## Properties of the app:

- React app with Bootstrap components
- Authenticated mutations


## User functionality:

- Register page to create a user
- Login page to get Bearer Token and store in localstorage
- Logout button to delete Bearer Token from localstorage
- Profile page to see user details
- If not logged in, every page except register will redirect to login page


## CRUD functionality (categories):

- Add page to create categories (handles input is scalable, use +/- buttons)
- Categories page shows categories made by the user
- Edit page to update or delete category
