import React, { useContext, useState } from "react";
import AuthContext from "./authcontext";
import ReactDOM from "react-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc, updateDoc, setDoc } from "firebase/firestore"
import { NavLink } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useAlert } from "react-alert";
import { Button, TextField } from "@mui/material";

function LoginPage(){
  const alert = useAlert();
  const [cookies, setCookie, removeCookie] = useCookies();

  function handleSetCookie(name:string, userObject: any) {
    setCookie(name, userObject, { path: '/' });
  }

var auth = useContext(AuthContext);
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoik6dAfUPkjTD4ediiG7phRzH3VKhthk",
  authDomain: "paper-plate-5ab88.firebaseapp.com",
  projectId: "paper-plate-5ab88",
  storageBucket: "paper-plate-5ab88.appspot.com",
  messagingSenderId: "514869257382",
  appId: "1:514869257382:web:374d1bd4bbeff81aa14067",
  measurementId: "G-HJRSQKL6KM"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const app = getFirestore();
// React States
const [errorMessages, setErrorMessages] = useState({});
const [isSubmitted, setIsSubmitted] = useState(false);
async function getUserInfo(uname:string){
  console.log(uname);
  var docref = doc(app, `users/${uname}`);
  console.log(docref);
  const userData = await(await getDoc(docref)).data();
  console.log(userData);
  return userData;
}
const errors = {
  uname: "invalid username",
  pass: "invalid password"
};
//@ts-ignore
const handleSubmit = (event) => {
  //Prevent page reload
  event.preventDefault();

  var { uname, pass } = document.forms[0];

  // Find user login info
  const userData = getUserInfo(uname.value).then(userData => {;

  // Compare user info
  if (userData) {
    console.log(userData);
    //@ts-ignore
    if (userData["password"] !== pass.value) {
      // Invalid password
      alert.error("Invalid password");
    } else {
      setIsSubmitted(true);
      auth.login();
      handleSetCookie("username", uname.value);
      handleSetCookie("password", pass.value);
      alert.success("Logged in successfully");
    }
  } else {
    // Username not found
    alert.error("Invalid username");
  }
});
};

// Generate JSX code for error message
//@ts-ignore
const renderErrorMessage = (name) =>
//@ts-ignore
  name === errorMessages.name && (
      //@ts-ignore
    <div className="error">{errorMessages.message}</div>
  );

// JSX code for login form
const renderForm = (
  <div className="form">
    <form onSubmit={handleSubmit}>
      <br />
      <div className="input-container">
        <TextField variant="standard" label="Username" type="text" name="uname" required />
        {renderErrorMessage("uname")}
      </div>
      <br />
      <div className="input-container">
        <TextField variant="standard" label="Password" type="password" name="pass" required />
        {renderErrorMessage("pass")}
      </div>
      <br />
      <div className="button-container">
        <Button type="submit" variant="contained" color="inherit" >Log in</Button>
      </div>
    </form>
  </div>
);
return (
    <div className="app">
      <div className="login-form">
        <br />
        <div className="title">Sign In</div>
        {isSubmitted ? <div><p>User is successfully logged in</p> 
        <NavLink to={"/"} style={{textDecoration: "none", color: "black"}}><Button variant="contained" color="inherit">Back</Button></NavLink></div> : renderForm}
      </div>
    </div>
  );
}


export default LoginPage;