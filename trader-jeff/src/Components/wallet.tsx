import { initializeApp } from "firebase/app";
import { getDoc, doc, getFirestore } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import ReactDOM from "react-dom";
import $ from "jquery";

const Wallet = () => {
  const [usedTokens, setUsedTokens] = useState(Array());
  const [walletcontent, setwalletcontent] = useState("");
  const [walletthingy, setWalletthingy] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies();
  const [price, setPrice] = useState("")
  var wallettokens: any[] = []
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
	  var userRef = doc(app, `users/${cookies.username}`);
	  //@ts-ignore
	  var userData = getDoc(userRef).then(userData => {
		if (userData.data()) {
      //@ts-ignore
      if (userData.data().password === cookies.password) {
        //@ts-ignore
			if(userData.data()["wallet"]){
				//@ts-ignore
				var wallet: any[] = userData.data()["wallet"];
        var wallletcontent: string = "";
        var contnum: number = 0;
        wallet.forEach(element => {
          if(contnum < wallet.length){

          wallletcontent += 
          `<tr><td>${element.token}</td><td>${element.amount}</td></tr>`
          console.log(wallletcontent)
          }
          else {
            return
          }
        })
        setUsedTokens(wallettokens)
        setwalletcontent(wallletcontent)
        setWalletthingy(true);
			} else {
        setWalletthingy(false);
			}
		}
  }
	})
  function setContent(){
    console.log(walletcontent)
    return { __html: "<tr><th>Token</th><th>Amount</th></tr>" + walletcontent.replace(",function () { [native code] }", "")};
  }
  if(walletthingy){
    return (
<div id="walletthing" style={{marginTop: 50}}>
<table dangerouslySetInnerHTML={setContent()}></table>
</div>
    )} else {
  return (
    <div id="walletthing">
      <div>
        <p>You have no items in your wallet</p>
      </div>
    </div>
  );
}
}

export default Wallet;