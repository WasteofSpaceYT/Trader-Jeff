import { NavLink, Outlet } from "react-router-dom";
import react, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import AuthContext from './authcontext';
import logo from "../logo.png"
import "./styles.css"
import { initializeApp } from "firebase/app";
import { getDoc, doc, getFirestore } from "firebase/firestore";
import LogoutIcon from '@mui/icons-material/Logout';
import SvgIcon from "@mui/icons-material/Logout";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import { Button } from "@mui/material";
import KeyIcon from '@mui/icons-material/Key';
import LockOpenIcon from '@mui/icons-material/LockOpen';

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
  const storage = getStorage(firebaseapp);
  const app = getFirestore();
  const [auth, setAuth] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [hover, setHover] = useState(false);
  const [daUrl, setDaUrl] = useState("");
  //setUrl("gs://paper-plate-5ab88.appspot.com/Screenshot (14).png")
  const handleFalse = () => {
    setHover(false);
  }
  const handleTrue = () => {
    setHover(true);
  }

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
          var imageref = ref(storage, `${cookies.username}.png`);
          getDownloadURL(imageref).then(url => {
            setDaUrl(url);
          }).catch(err => {
            getDownloadURL(ref(storage, "OIP.png")).then(url => {
              setDaUrl(url);
            })
          })
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
  const handleLogout = (event: any) => {
    event.preventDefault();
    handleCookieLogout("username");
    handleCookieLogout("password");
    setAuth(false);
    window.location.href = "/";
  }
  console.log(daUrl)
  return (
    <><nav className="navbar">
      <NavLink to="/"><img src={logo} alt="" className="navlogo"></img></NavLink>
      <NavLink to="/charts" style={{ color: "black", textDecoration: "none" }}><Button variant="outlined" size="small" color="inherit" startIcon={<CandlestickChartIcon />}>Charts</Button></NavLink>
      {/* <NavLink to="/wallet"><button className="button1">Wallet</button></NavLink>
      <NavLink to="/buy"><button className="button1">Buy</button></NavLink>
      <NavLink to="/sell"><button className="button1">Sell</button></NavLink> */}
      {auth ? <a id="profileIcon" className="alignright" onMouseOver={handleTrue} onMouseLeave={handleFalse}><img src={daUrl} style={{ width: "50px", height: "50px", borderRadius: 50 / 2, float: "right" }}
      /><br /><br />{hover ? 
      <ul>
        <li style={{marginBottom: 5}}><NavLink to="/wallet" style={{ textDecoration: "none", color: "black"}}><Button variant="contained" className="ProfileList">Wallet</Button></NavLink></li>
        <li style={{marginBottom: 5}}><NavLink to="/buy" className="navLinkThing"><Button variant="contained" className="ProfileList">Buy</Button></NavLink>  <NavLink to="/sell" style={{ textDecoration: "none", color: "black"}}><Button variant="contained" className="ProfileList">Sell</Button></NavLink></li>
        <li style={{marginBottom: 5}}><NavLink to="/acctset" style={{ textDecoration: "none", color: "black", marginBottom: 5 }}><Button variant="contained" className="ProfileList">Account Settings</Button></NavLink></li>
        <li style={{marginBottom: 5}}><Button className="DelButt" variant="contained" color="error" onClick={handleLogout}><SvgIcon /></Button></li>
      </ul> : ""}</a> : <header className="alignright">
        <NavLink to="/login" style={{ textDecoration: 'none', color: "black" }}><Button color="inherit" variant="outlined" startIcon={<KeyIcon />}>Login</Button></NavLink>
        <NavLink to="/signup" style={{ textDecoration: 'none', color: "black", marginLeft: 5 }}><Button variant="outlined" color="inherit" startIcon={<LockOpenIcon />}>Sign-up</Button></NavLink>
      </header>}
    </nav>
      <Outlet /></>
  )
};

export default Layout;