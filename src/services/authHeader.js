export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.accessToken) {
        // return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
        return { Authorization: 'Bearer ' + user.accessToken };       // for Node.js Express back-end
    } else {
        return { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDhhODhhNWE2ZWMxNjA4Nzc4ZmZjYjYiLCJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIkMmIkMTIkOU1lTFdNcFBhdEEvQ2ZQRmM2REJ6ZXpKRUh4Yy9nOGg4UUdtQXFBVjA5cC9SdjlEc094MksiLCJfX3YiOjAsImlhdCI6MTYxOTg1MTQ0M30.zADDWyDRAzKiiCKrGUXZL0ohd1lYWO4hPk3-YOBRdDA' };
    }

    // } else {
    //     return {};
    // }
  }