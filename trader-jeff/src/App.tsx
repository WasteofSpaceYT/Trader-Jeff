import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import LoginPage from "./Components/login";
import Home from "./Components/home";
import ErrorPage from "./Components/error";
import Layout from "./Components/layout"
import Chart from "./Components/charts";
import Signup from "./Components/signup";
import AuthContext from "./Components/authcontext";
import Wallet from "./Components/wallet";
function App(){
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  function handleSetCookie() {
    setCookie("user", "obydul", { path: '/' });
  }

  const [auth, setAuth] = useState(false);
   const login = () => {
      setAuth(true);
   };
   const logout = () => {
      setAuth(false);
   };
   
return (
  <React.Fragment>
      <AuthContext.Provider
            value={{ auth: auth, login: login, logout: logout, redirect: "" }}
      >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="charts" element={<Chart />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="signup" element={<Signup path={window.location.pathname}/>} />
          <Route path="wallet" element={<Wallet />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthContext.Provider>
  </React.Fragment>
  );
}

export default App;