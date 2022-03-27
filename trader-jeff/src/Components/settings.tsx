import { initializeApp } from "firebase/app";
import { deleteDoc, doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import react, { useState } from "react"
import { useAlert } from "react-alert";
import { useCookies } from "react-cookie";
import SaveIcon from '@mui/icons-material/Save';
import Save from "@mui/icons-material/Save";
import SvgIcon from "@mui/icons-material/Save";
import { ref, getDownloadURL, getStorage, uploadBytes } from "firebase/storage";
import React from "react";
import LockResetIcon from '@mui/icons-material/LockReset';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TextField from '@mui/material/TextField';
import { Button, IconButton, Input, InputAdornment } from "@mui/material";
import UploadIcon from '@mui/icons-material/Upload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteForever from "@mui/icons-material/DeleteForever";
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink } from "react-router-dom";

const Settings = () => {
  const alert = useAlert();
  const [auth, setAuth] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [hideShow, setHideShow] = useState(false);
  const [currency, setCurrency] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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
  const storage = getStorage(firebaseapp);
  const [daUrl, setDaUrl] = useState('OIP.png');
  const [passChange, setPassChange] = useState(true);
  const [typee, setTypee] = useState("password");


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
          //@ts-ignore
          setCurrency(userData.data().currency)
          //@ts-ignore
          setFirstName(userData.data().first)
          //@ts-ignore  
          setLastName(userData.data().last)
          //@ts-ignore
          const imagesRef = ref(storage, `${cookies.username}.png`);
          getDownloadURL(imagesRef).then(url => {
            console.log(url)
            setDaUrl(url);
          }).catch(err => {
            getDownloadURL(ref(storage, 'OIP.png')).then(url => {
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
  }
  const handle = async () => {
    const val = prompt(`Enter your password to delete your account`);
    var docref = doc(app, `users/${cookies.username}`)
    //@ts-ignore
    var pass = (await getDoc(docref)).data()
    //@ts-ignore
    if (val == pass.password) {
      //delete account
      deleteDoc(doc(app, `users/${cookies.username}`)).then(() => {
        console.log("deleted")
        handlelogout()
      })
    } else {
      alert.error("Incorrect password")
    }
  }
  const handleProfChange = (event: any) => {
    event.preventDefault();
  }
  const handleCurrencyChange = (event: any) => {
    event.preventDefault();
  }
  const handlePrivChange = (event: any) => {
    event.preventDefault();
  }
  const handlePfPChange = (event: any) => {
    event.preventDefault();
    //@ts-ignore
    var file = document.getElementById("filethingy").files[0]
    console.log(file)
    if (!file) {
      return alert.error("No file selected")
    }
    var storageRef = ref(storage, `${cookies.username}.png`)
    uploadBytes(storageRef, file).then((snapshot: any) => {
      console.log('Uploaded a blob or file!');
      window.location.reload()
    });
  }
  function handleCookieLogout(name: string) {
    removeCookie(name, { path: '/' });
  }
  const [passVis, setPassViss] = useState("password");
  const [newPassVis, setNewPassViss] = useState("password");
  const [PassConfViss, setPassConfViss] = useState("password");
  const setPassVis = (event:any) => {
    console.log(event.target)
    if (passVis == "password") {
      setPassViss("text")
    } else {
      setPassViss("password")
    }
  }
  const setNewPassVis = () => {
    if (newPassVis == "password") {
      setNewPassViss("text")
    } else {
      setNewPassViss("password")
    }
  }
  const setPassConfVis = () => {
    if (PassConfViss == "password") {
      setPassConfViss("text")
    } else {
      setPassConfViss("password")
    }
  }
  const showHide = (event: any) => {
    if (hideShow == false) {
      var pass = prompt("Enter your password.")
      if (pass == cookies.password) {
        //@ts-ignore
        document.getElementById("passField").type = "text"
        alert.success("Correct Password")
        setHideShow(true)
      } else {
        alert.error("Incorrect password")
      }
    } else {
      //@ts-ignore
      document.getElementById("passField").type = "password"
      setHideShow(false)
    }
  }
  function handlelogout() {
    handleCookieLogout("username");
    handleCookieLogout("password");
    setAuth(false);
    window.location.href = "/";
  }
  const handleLogout = (event: any) => {
    event.preventDefault();
    handleCookieLogout("username");
    handleCookieLogout("password");
    setAuth(false);
    window.location.href = "/";
  }
  const handlePassChange = (event: any) => {
    event.preventDefault();
    var { pass, newPass, newPassConf } = document.forms[1]
    if (pass.value != cookies.password) {
      alert.error("Incorrect password")
      return
    } else {
      if (newPass.value != newPassConf.value) {
        alert.error("Passwords do not match")
        return
      }
      var docref = doc(app, `users/${cookies.username}`)
      //@ts-ignore
      setPassChange(false)
      updateDoc(docref, { password: newPass.value }).then(() => {
        alert.success("Password changed")
        setPassChange(true)
        window.location.reload()
      }).catch(err => {
        alert.error("Error changing password")
        setPassChange(true)
      })
    }
  }
  if (auth) {
    return (
      <div>
        <p>Settings</p>
        <div style={{ borderRadius: 5, paddingLeft: 10 }} className="acctDiv">
          <div>
            <h5>Profile settings</h5>
            <form onSubmit={handleProfChange}>
              <h3>Profile Picture</h3>
              <img style={{ width: "100px", height: "100px", borderRadius: 100 / 2 }} src={daUrl !== undefined ? daUrl : "https://firebasestorage.googleapis.com/v0/b/paper-plate-5ab88.appspot.com/o/OIP.png?alt=media&token=df5cced8-8166-43a4-839a-36f2a2dc44c3"}></img>
              <br />
              <label htmlFor="filethingy">
                <Input id="filethingy" type="file" />
                <br />
                <br />
                <Button variant="outlined" onClick={handlePfPChange} color="inherit" endIcon={<UploadIcon />} >
                  Upload
                </Button>
                <br />
              </label>
              <br />
              <TextField variant="standard" label="First Name" value={firstName} />
              <br />
              <br />
              <TextField variant="standard" label="Last Name" value={lastName} />
              <br />
              <br />
              <TextField variant="standard" label="Display Name" value={cookies.username} />
              <br />
              <br />
              <Button type="submit" variant="outlined" endIcon={<SvgIcon />} color="inherit">Save</Button>
            </form>
          </div>
          <div>
            <h5>Change Password</h5>
            <form onSubmit={handlePassChange}>
              <TextField type={passVis} variant="standard" label="Current Password" id="pass" InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <VisibilityIcon onClick={setPassVis} />
                  </InputAdornment>
                ),
              }} />
              <br />
              <br />
              <TextField type={newPassVis} variant="standard" label="New Password" id="newPass" InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <VisibilityIcon onClick={setNewPassVis} />
                  </InputAdornment>
                ),
              }} />
              <br />
              <br />
              <TextField type={PassConfViss} variant="standard" label="Confirm New Password" id="newPassConf" InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <VisibilityIcon onClick={setPassConfVis} />
                  </InputAdornment>
                ),
              }} />
              <br />
              <br />
              <Button type="submit" variant="outlined" endIcon={<LockResetIcon />} color="inherit">Change password</Button>
            </form>
            <br />
            <br />
            <h3 style={{ color: 'red' }}>Danger Zone</h3>
            <p>Delete your account</p>
            <Button onClick={handle} variant="contained" endIcon={<DeleteForeverIcon />} color="error">Delete</Button>
          </div>
          <br />
          <h3>Not So Danger Zone</h3>
          <Button onClick={handleLogout} variant="outlined" endIcon={<LogoutIcon />} color="inherit">Logout</Button>
          <br />
          <br />
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <p>You are not logged in.</p>
        <Button href="/login" variant="outlined" color="inherit">Login</Button>
      </div>
    )
  }
}

export default Settings