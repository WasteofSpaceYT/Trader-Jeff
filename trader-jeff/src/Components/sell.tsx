import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { getEnabledCategories } from 'trace_events';
import SellIcon from '@mui/icons-material/Sell';
import $ from 'jquery';
import { Button, TextField } from '@mui/material';

function Sell() {

  const [cookies, setCookie, removeCookie] = useCookies();
  const [errorText, setErrorText] = useState("");
  const [hasAmount, setHasAmount] = useState(0);
  const [token, setToken] = useState("")
  const [totalMessage, setTotalMessage] = useState("");
  const [amount, setAmount] = useState("")
  const [price, setPrice] = useState("")

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
      var tOken = event.target.value.toUpperCase();
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
      if(event.target.value != ""){
      setAmount(event.target.value);
      var options = {
        url: `https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v8/finance/chart/${token}`,
        params: { range: '1d', comparisons: 'AMZN', events: 'div,split' },
        headers: {
          'x-rapidapi-key': 'fdce3efc23mshe63dce1b90f5763p1672e8jsn9c315c3a4421',
          'x-rapidapi-host': 'stock-data-yahoo-finance-alternative.p.rapidapi.com'
        }
      };
      $.get(options).done(res => {
        setPrice(res.chart.result[0].meta.regularMarketPrice);
        if(cookies.username && cookies.password) {
          var docref = doc(app, `users/${cookies.username}`)
          if(docref){
            getDoc(docref).then(data => {
              //@ts-ignore
              if(data.data().password == cookies.password){
                var userData = data.data();
                //@ts-ignore
                for(var i in userData.wallet){
                  //@ts-ignore
                if(userData.wallet[i].token == token){
                    //@ts-ignore
                  setHasAmount(userData.wallet[i].amount)
                }
                }
        //@ts-ignore
        console.log(event.target.value)
        console.log(price)
      var totaltotal = parseFloat(event.target.value) * parseFloat(price);
      setTotalMessage(totaltotal.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      
            }
          })
    }
        }
}).catch(err => {
      })
      } else {
        setAmount("0.00")

      }
    },1000 )
    
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
                setHasAmount(amount)
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
        <TextField type="text" variant='standard' label="Token" onInput={Balanceing} required />
        <br />
        <br />
        {(token != "") ? <TextField variant="standard" type="number" inputProps={{inputProps: {min: 0, max: hasAmount, type: "number"}}} placeholder="Amount" onChange={settotal} style={{marginRight: 10}} required /> : <TextField variant="standard" type="number" inputProps={{inputProps: {min: 0, type: "number"}}} label="Amount" style={{marginRight: 10}} disabled />}
        {(token != "") ? <TextField variant="standard" type="text" label={`Total: $${totalMessage}`} style={{ marginBottom: 10 }} disabled /> : <TextField type="text" label={`Total:`} variant="standard" style={{ marginBottom: 10 }} disabled />}
        <br />
        <Button type="submit" variant="contained" color="inherit" startIcon={<SellIcon />}>Sell</Button>
        <br />
        <p className="errorText">{errorText}</p>
      </form>
    </div>
  );
}

export default Sell;