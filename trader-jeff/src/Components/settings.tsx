import { initializeApp } from "firebase/app";
import { deleteDoc, doc, getDoc, getFirestore } from "firebase/firestore";
import react, { useState } from "react"
import { useAlert } from "react-alert";
import { useCookies } from "react-cookie";
import SaveIcon from '@mui/icons-material/Save';
import Save from "@mui/icons-material/Save";
import SvgIcon from "@mui/icons-material/Save";

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
        if(val == pass.password) {
            //delete account
            deleteDoc(doc(app, `users/${cookies.username}`)).then(() => {
                console.log("deleted")
                handlelogout()
            })
        } else {
            alert.error("Incorrect password")
        }
    }
    const handleProfChange = (event:any) => {
        event.preventDefault();
    }
    const handleCurrencyChange = (event:any) => {
        event.preventDefault();
    }
    const handlePrivChange = (event:any) => {
        event.preventDefault();
    }
    function handleCookieLogout(name: string) {
        removeCookie(name, { path: '/' });
      }
      const showHide = (event:any) => {
        if(hideShow == false){
        var pass = prompt("Enter your password.")
        if(pass == cookies.password) {
        //@ts-ignore
        document.getElementById("passField").type = "text"
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
        window.location.href="/";
      }
    const handleLogout = (event: any) => {
        event.preventDefault();
        handleCookieLogout("username");
        handleCookieLogout("password");
        setAuth(false);
        window.location.href="/";
      }
    return (
        <div>
        <p>Settings</p>
        <div style={{borderRadius: 5, paddingLeft: 10}} className="acctDiv">
            <div>
                <h5>Profile settings</h5>
                <form onSubmit={handleProfChange}>
                    <label>First Name</label>
                    <br />
                    <input type="text" placeholder="First Name" name="fname" value={firstName} />
                    <br />
                    <label>Last Name</label>
                    <br />
                    <input type="text" placeholder="Last Name" name="lname" value={lastName} />
                    <br />
                    <label>Display Name</label>
                    <br />
                    <input type="text" placeholder="Display Name" name="dname" defaultValue={cookies.username} />
                    <br />
                    <br />
                    <button type="submit" className="SaveButton">Save <SvgIcon></SvgIcon></button>
                </form>
            </div>
            <div>
                <h5>Currency</h5>
                <form onSubmit={handleCurrencyChange}>
                    <label>Currency</label>
                    <br />
                    <input type="text" name="currency" defaultValue={currency}/>
                    <br />
                    <br />
                    <button type="submit" className="SaveButton">Save <SvgIcon></SvgIcon></button>
                </form>
            </div>
            <div>
                <h5>Privacy</h5>
                <form onSubmit={handlePrivChange}>
                <label>Username</label>
                    <br />
                    <input type="text" name="username" defaultValue={cookies.username}/>
                    <br />
                    <label>Password</label>
                    <br />
                    <input type="password" name="password" id="passField" defaultValue={cookies.password}/>
                    <button className="ProfileList" onClick={showHide}>Show/Hide</button>
                    <br />
                    <br />
                    <button type="submit" className="SaveButton">Save <SvgIcon /></button>
                <button onClick={handle} className="DelButt" >Delete</button>
                </form>
            </div>
            <br />
            <button className="ProfileList" onClick={handleLogout}>Logout</button>
            <br />
            <br />
        </div>
        </div>
    )
}

export default Settings