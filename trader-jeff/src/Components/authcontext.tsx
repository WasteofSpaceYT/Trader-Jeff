import React from 'react';

const authContext = React.createContext({
   auth: false,
   login: () => {},
   logout: () => {},
   redirect: ""
});
export default authContext;