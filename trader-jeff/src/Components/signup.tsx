//import react from "react"
import { Button, TextField } from "@mui/material";
import { render } from "@testing-library/react";
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { useAlert } from "react-alert";
import { useCookies } from "react-cookie";
import ReactDOM from "react-dom";
import { NavLink } from "react-router-dom";
import AuthContext from "./authcontext";
//import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
interface SigninPageProps {
  path: string;
}

function Signup({path}: SigninPageProps) {
  
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

  var { uname, pass, balance } = document.forms[0];
  if(uname.value === ""){
    alert.error("invalid username");
    return;
  }
  if(pass.value === ""){
    alert.error("invalid password");
    return;
  }
  if(balance.value === ""){
    alert.error("invalid balance");
    return;
  }
  const userData = getUserInfo(uname.value).then(userData => {
  if(userData){
    alert.error("username already exists");
    return;
  } else {
    var udat = {
      password: pass.value,
      balance: parseInt(balance.value),
      wallet: []
    }
    var docref = doc(app, `users/${uname.value}`);
    setDoc(docref, udat)
    setIsSubmitted(true);
    alert.success("Account created");
  }
  })
}


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
    <br />
    <form onSubmit={handleSubmit}>
      <div className="input-container">
        <TextField label="Username" variant="standard" type="text" name="uname" required />
        {renderErrorMessage("uname")}
      </div>
      <br />
      <div className="input-container">
        <TextField label="Password" variant="standard" type="password" name="pass" required />
        {renderErrorMessage("pass")}
      </div>
      <br />
      <div className="input-container">
        <TextField variant="standard" label="Starting Balance" type="number" name="balance" prefix="$" inputProps={{inputProps: {min: 0}}} required />
        </div>
        <br />
      <div className="button-container">
        <Button variant="contained" color="inherit" type="submit" >Sign Up</Button>
      </div>
    </form>
  </div>
);
return (
    <div className="app">
      <div className="login-form">
        <br />
        <div className="title">Sign Up</div>
        {isSubmitted ? <div><p>User has successfully registered</p> 
        <NavLink to={"/login"} style={{textDecoration: "none", color: "black"}}><Button variant="contained" color="inherit">Login</Button></NavLink></div> : renderForm}
      </div>
    </div>
  );
}

export default Signup;