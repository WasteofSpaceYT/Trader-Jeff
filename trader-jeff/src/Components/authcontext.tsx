import React from 'react';

const authContext = React.createContext({
   auth: false,
   login: () => {},
   logout: () => {},
});
export default authContext;