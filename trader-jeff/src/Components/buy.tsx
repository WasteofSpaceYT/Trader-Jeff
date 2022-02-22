import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { userInfo } from 'os';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import $ from 'jquery';

function Buy() {
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
  function handleCookieLogout(name: string) {
    removeCookie(name, { path: '/' });
  }
  const [auth, setAuth] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies();
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
        } else {
          console.log("invalid password");
          handleCookieLogout("username");
          handleCookieLogout("password");
        }
      }
    }).catch((err: any) => {
      console.log(err)
      handleCookieLogout("username")
      handleCookieLogout("password")
    }
    );
    console.log(auth);
  }


  var submit = (event: any) => {
    event.preventDefault();

    var tokenval = event.target[0].value.toUpperCase();
    var amountval = event.target[1].value;

    if (auth) {
      var uname = cookies.username;
      var docref = doc(app, `users/${uname}`);
      getDoc(docref).then(userData => {
        if (userData.data()) {
          var user = userData.data();
          //@ts-ignore
          console.log(user)
          //@ts-ignore
          var token = user.token;
          var amount: string | undefined;
          var index: string;
          var options = {
            url: `https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v8/finance/chart/${tokenval}`,
            params: { range: '1d', comparisons: 'AMZN', events: 'div,split' },
            headers: {
              'x-rapidapi-key': 'fdce3efc23mshe63dce1b90f5763p1672e8jsn9c315c3a4421',
              'x-rapidapi-host': 'stock-data-yahoo-finance-alternative.p.rapidapi.com'
            }
          };
          $.get(options).done(res => {
            var price: string = res.chart.result[0].meta.regularMarketPrice.toString();
            //@ts-ignore
            for (var i in user.wallet) {
              //@ts-ignore
              if (user.wallet[i].token == tokenval) {
                //@ts-ignore
                amount = user.wallet[i][price];
                index = i
              }
            }
          })


          // Make the system for several sets of purchases of same stock but at different prices. price = amount or smth. Also get the average for the wallet.




          if (amount != undefined) {
            console.log(amount)
            //add shares to existing shares
            var userinfo = userData.data()
            var newamount = parseInt(amount) + parseInt(amountval);
            //@ts-ignore
            userinfo.wallet[index].amount = newamount;
            updateDoc(docref, userinfo);
            console.log("updated user")
          } else {
            // add new token and amount
            var newamount = parseInt(amountval);
            var userinfo = userData.data()
            var options = {
              url: `https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v8/finance/chart/${tokenval}`,
              params: { range: '1d', comparisons: 'AMZN', events: 'div,split' },
              headers: {
                'x-rapidapi-key': 'fdce3efc23mshe63dce1b90f5763p1672e8jsn9c315c3a4421',
                'x-rapidapi-host': 'stock-data-yahoo-finance-alternative.p.rapidapi.com'
              }
            };
            $.get(options).done(res => {
              var userinfo = userData.data()
              var price: string = res.chart.result[0].meta.regularMarketPrice.toString();
              // @ts-ignore
              var uinfo = userinfo.wallet[index]
              console.log(index)
              console.log(typeof uinfo)
              // @ts-ignore
              if (userinfo.wallet[index][price] === undefined) {
                //@ts-ignore
                uinfo[price] = amountval;
                console.log(uinfo)
              } else {
                var userinfo = userData.data()
                //@ts-ignore
                uinfo[price] = (parseInt(userinfo.wallet[index][price]) + parseInt(amountval)).toString();
              }
              var userinfo = userData.data()
              //@ts-ignore
              console.log(typeof userinfo.wallet[index])
              console.log(uinfo)
              //@ts-ignore
              userinfo.wallet[index] = (uinfo);
              //@ts-ignore
              if (userinfo.wallet[index].amount != undefined) {
                //@ts-ignore
                var newamount = parseInt(userinfo.wallet[index].amount) + parseInt(amountval).toString();
              } else {
                newamount = amountval
              }
              //@ts-ignore
              userinfo.wallet[index].amount = newamount;
              updateDoc(docref, userinfo);
              console.log("updated user")
            });

          }
        }
      })
    } else {

    }
  }

  return (
    <div>
      <h1>Buy</h1>
      <form onSubmit={submit}>
        <input type="text" placeholder="Token" style={{ marginBottom: 10 }} required />
        <br />
        <input type="text" placeholder="Amount" style={{ marginBottom: 10 }} required />
        <br />
        <input type="submit" value="Buy" />
      </form>
    </div>
  )
}

export default Buy;