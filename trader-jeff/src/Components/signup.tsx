//import react from "react"
import { render } from "@testing-library/react";
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import ReactDOM from "react-dom";
import { NavLink } from "react-router-dom";
import AuthContext from "./authcontext";
//import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
interface SigninPageProps {
  path: string;
}

function Signup({path}: SigninPageProps) {
  

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
      setErrorMessages({ name: "pass", message: errors.pass });
    } else {
      setIsSubmitted(true);
      auth.login();
      handleSetCookie("username", uname.value);
      handleSetCookie("password", pass.value);
    }
  } else {
    // Username not found
    setErrorMessages({ name: "uname", message: errors.uname });
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
      <div className="input-container">
        <label>Username </label>
        <input type="text" name="uname" required />
        {renderErrorMessage("uname")}
      </div>
      <div className="input-container">
        <label>Password </label>
        <input type="password" name="pass" required />
        {renderErrorMessage("pass")}
      </div>
      <div className="button-container">
        <input type="submit" value="Login" />
      </div>
    </form>
  </div>
);
return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div><p>User has successfully registered</p> 
        <NavLink to={path}><button>Back</button></NavLink></div> : renderForm}
      </div>
    </div>
  );
}

export default Signup;