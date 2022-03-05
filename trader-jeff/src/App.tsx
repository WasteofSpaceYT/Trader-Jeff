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
import Buy from "./Components/buy";
import Sell from "./Components/sell";
import Dashboard from "./Components/dashboard";
import Settings from "./Components/settings";
import { Provider, positions } from "react-alert";
//@ts-ignore
import AlertTemplate from "react-alert-template-basic";

function App() {
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
  const options = {
    timeout: 5000,
    position: positions.BOTTOM_CENTER
  };
  return (
    <React.Fragment>
      <Provider template={AlertTemplate} {...options}>
      <AuthContext.Provider
        value={{ auth: auth, login: login, logout: logout, redirect: "" }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="charts" element={<Chart />} />
              {/* <Route path="getKey" element={<GetKey />} /> */}
            <Route path="*" element={<ErrorPage />} />
            <Route path="signup" element={<Signup path={window.location.pathname} />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="buy" element={<Buy />} />
            <Route path="sell" element={<Sell />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="acctset" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
    </Provider>
  </React.Fragment >
  );
}

export default App;