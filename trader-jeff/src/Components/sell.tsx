import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { getEnabledCategories } from 'trace_events';

function Sell() {

  const [cookies, setCookie, removeCookie] = useCookies();
  const [errorText, setErrorText] = useState("");
  const [hasAmount, setHasAmount] = useState("");
  const [token, setToken] = useState("")
  const [totalMessage, setTotalMessage] = useState("");
  const [amount, setAmount] = useState("")

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

  var Balanceing = (event: any) => {
    setTimeout(() => {
      var tOken = event.target.value;
      setToken(tOken);
      
      if(cookies.username && cookies.password) {
        var docref = doc(app, `users/${cookies.username}`)
        if(docref){
          getDoc(docref).then(data => {
            //@ts-ignore
            if(data.data().password == cookies.password){
              //@ts-ignore
              for(var i in data.data().wallet){
                //@ts-ignore
                if(data.data().wallet[i].token == tOken){
                  //@ts-ignore
                  setTotalMessage(data.data().wallet[i].amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                }
              }
            }
          }).catch(err => {
            setTotalMessage("")
          })
        }
      }
    },1000 )
  }
  var settotal = (event: any) => {
    setTimeout(() => {
      setAmount(event.target.value);
    },1000 )
    var totaltotal = parseInt(event.target.value) * parseInt(amount);
    setTotalMessage(totaltotal.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }


    var submit = (event: any) => {
      event.preventDefault();
      if(cookies.username && cookies.password) {
      var docref = doc(app, `users/${cookies.username}`)
      if(docref){
        getDoc(docref).then(data => {
          //@ts-ignore
          if(data.data().password == cookies.password){
            var userData = data.data();
            var tokenval = event.target[0].value.toUpperCase();
            var amountval = event.target[1].value;
            var index: string | undefined;
            var amount;
            //@ts-ignore
            for(var i in userData.wallet){
              //@ts-ignore
              if(userData.wallet[i].token == tokenval){
                index = i
                //@ts-ignore
                amount = userData.wallet[i].amount;
              }
            }
            if(parseInt(amount) < parseInt(amountval)){
              setErrorText("You do not have enough of this stock")
              setHasAmount(amount)
              setInterval(() => {
                setErrorText("")
                }, 2000)
            } else {
              var newAmount = parseInt(amount) - parseInt(amountval)
              //@ts-ignore
              var lastTransaction = userData.wallet[index].transactionPrices.pop();
              //@ts-ignore
              if(parseInt(userData.wallet[lastTransaction]) < parseInt(amountval)){
                //@ts-ignore
                var remVal = parseInt(userData.wallet[lastTransaction]) - parseInt(amountval)
              } else {
                //@ts-ignore
                var newVal = parseInt(userData.wallet[index][lastTransaction]) - parseInt(amountval)
              }
            }
          }
        })
      }
      }
    }

  return (
    <div>
    <h1>Sell</h1>
    <form onSubmit={submit}>
        <input type="text" placeholder="Token" style={{ marginBottom: 10 }} onInput={Balanceing} required />
        <br />
        {(token != "") ? <input type="number" min={0} placeholder="Amount" onChange={settotal} style={{marginRight: 10}} required /> : <input type="number" min={0} placeholder="Amount" style={{marginRight: 10}} disabled />}
        {(token != "") ? <input type="text" placeholder={`Total: ${totalMessage}`} style={{ marginBottom: 10 }} disabled /> : <input type="text" placeholder={`Total:`} style={{ marginBottom: 10 }} value={""} disabled />}
        <br />
        <input type="submit" value="Sell" />
        <br />
        <p className="errorText">{errorText}</p>
      </form>
    </div>
  );
}

export default Sell;