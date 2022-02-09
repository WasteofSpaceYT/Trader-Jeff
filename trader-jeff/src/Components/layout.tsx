import { NavLink, Outlet } from "react-router-dom";
import react, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import AuthContext from './authcontext';
import logo from "../logo.png"
import "./styles.css"
import { initializeApp } from "firebase/app";
import { getDoc, doc, getFirestore } from "firebase/firestore";

const Layout = () => {
  //@ts-ignore
  var firebaseConfig = {
    apiKey: "AIzaSyCoik6dAfUPkjTD4ediiG7phRzH3VKhthk",
    authDomain: "paper-plate-5ab88.firebaseapp.com",
    projectId: "paper-plate-5ab88",
    storageBucket: "paper-plate-5ab88.appspot.com",
    messagingSenderId: "514869257382",
    appId: "1:514869257382:web:374d1bd4bbeff81aa14067",
    measurementId: "G-HJRSQKL6KM"
  }

  // Initialize Firebase
  const firebaseapp = initializeApp(firebaseConfig);
  const app = getFirestore();
  const [auth, setAuth] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();

  function handleCookieLogout(name: string) {
    removeCookie(name, { path: '/' });
  }

  //Your funky logic here
  if (cookies.username != null && cookies.password != null && !auth) {
    //check credentials
    var docref = doc(app, `users/${cookies.username}`);
    //@ts-ignore
    var userData = getDoc(docref).then(userData => {
      if (userData.data()) {
        //@ts-ignore
        if (userData.data().password == cookies.password) {
          setAuth(true);
          console.log("logged in")
          console.log(auth)
        } else {
          console.log("invalid password");
          handleCookieLogout("username");
          handleCookieLogout("password");
        }
      }
    }).catch(err => {
      console.log(err)
      handleCookieLogout("username")
      handleCookieLogout("password")
    }
    );
    console.log(auth);
  }

  return (
    <>
      <nav className="navbar">
        <NavLink to="/"><img src={logo} alt="" className="navlogo"></img></NavLink>
        <NavLink to="/charts"><button className="button1">Charts</button></NavLink>
        <NavLink to="/wallet"><button className="button1">Wallet</button></NavLink>
        {auth ? <a id="profileIcon" className="alignright"><img src={logo} style={{ width: "50px", height: "50px", borderRadius: 50 / 2 }}
    /></a> : <header className="alignright">
          <NavLink to="/login" ><button className="button1">Login</button></NavLink>
          <NavLink to="/signup"><button className="button1">Sign-up</button></NavLink>
        </header>}
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;