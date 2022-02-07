import { initializeApp } from "firebase/app";
import { getDoc, doc, getFirestore } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import ReactDOM from "react-dom";

const Wallet = () => {
  var walletcontent: any[] = [];
  const [walletthingy, setWalletthingy] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies();
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
	  var userRef = doc(app, `users/${cookies.username}`);
	  //@ts-ignore
    
	  var userData = getDoc(userRef).then(userData => {
		if (userData.data()) {
		  //@ts-ignore
			if(userData.data()["wallet"]){
				//@ts-ignore
				var wallet = userData.data()["wallet"];
				//@ts-ignore
				for(var i = 0; i < wallet.length; i++){
					//@ts-ignore
					var walletitem = wallet[i];
					//@ts-ignore
					walletcontent.push(
						`<div className="walletitem">
							<div className="walletitem-name">${walletitem.name}</div>
							<div className="walletitem-price">${walletitem.price}</div>
							<div className="walletitem-amount">${walletitem.amount}</div>
						</div>`
					)
				}
        setWalletthingy(true);
        console.log("beep")
        console.log(walletcontent)
			} else {
        setWalletthingy(false);
        console.log("beepp")
			}
		}
	})
  function Set() {
    return { __html: walletcontent.join("").replace("\n", "").replace("\t", "") };
  }
  return (
    <div id="walletthing">
      {walletthingy ? <div dangerouslySetInnerHTML={Set()}></div> :
      <div>
        <p>You have no items in your wallet</p>
      </div>}
    </div>
  );
}

export default Wallet;