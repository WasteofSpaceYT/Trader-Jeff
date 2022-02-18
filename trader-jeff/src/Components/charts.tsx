import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { Http2ServerRequest } from "http2";
import React from "react";
import { useCookies } from "react-cookie";
import ReactDOM from "react-dom";
import http from "https"

function Chart(){

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

  var useKey = 0
	//@ts-ignore
	const drawchart = async (event) => {
		event.preventDefault();
		var token = event.target[0].value
    const options = {
      "method": "GET",
      "hostname": "stock-data-yahoo-finance-alternative.p.rapidapi.com",
      "port": null,
      "path": `/v8/finance/chart/${token}?comparisons=AMZN&events=div%2Csplit`,
      "headers": {
        "x-rapidapi-key": "fdce3efc23mshe63dce1b90f5763p1672e8jsn9c315c3a4421",
        "x-rapidapi-host": "stock-data-yahoo-finance-alternative.p.rapidapi.com",
        "useQueryString": true
      }
    };
    //@ts-ignore
    const req = http.request(options, function (res) {
      const chunks: any[] = [];
    
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
    
      res.on("end", function () {
        const body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    });
    
    req.end();
  }

    return(
<>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossOrigin="anonymous" />
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossOrigin="anonymous"></script>
	<script src="jquerry.js"></script>

<br />

<div className="form">
    <form onSubmit={drawchart}>
      <div className="input-container">
        <input type="text" name="tokenfield" required />
      </div>
      <div className="button-container">
        <input type="submit" value="Draw Chart" />
      </div>
    </form>
  </div>
	<br />
	<p className="errorText" id="errorText"></p>
<iframe width="900" height="800" frameBorder="0" scrolling="no" title="chart" src="https://plotly.com/~WasteofSpaceYT/1.embed" id="iframe"></iframe>

</>
    )
}

export default Chart;