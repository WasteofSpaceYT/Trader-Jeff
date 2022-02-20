import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { Http2ServerRequest } from "http2";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import ReactDOM from "react-dom";
import $ from "jquery";
import Plot from 'react-plotly.js'


function Chart(){ 
  const [useDataX, setDataX] = useState([]);
  const [dataX, setDataX2] = useState([]);
  const [token, setToken] = useState("");
  const [useOpen, setOpen] = useState([]);
  const [useClose, setClose] = useState([]);
  const [useHigh, setHigh] = useState([]);
  const [useLow, setLow] = useState([])
  const [errorText, setErrorText] = useState("")
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
	const drawchart = (event) => {
		event.preventDefault();
		
    var tokenval = event.target[0].value.toUpperCase();
var options = {
  url: `https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v8/finance/chart/${tokenval}`,
  params: {range: '1d', comparisons: 'AMZN', events: 'div,split'},
  headers: {
    'x-rapidapi-key': 'fdce3efc23mshe63dce1b90f5763p1672e8jsn9c315c3a4421',
    'x-rapidapi-host': 'stock-data-yahoo-finance-alternative.p.rapidapi.com'
  }
};
$.get(options).done(data => {
  console.log(data)

  if(data.chart.result[0].indicators.quote[0].high == undefined) {
    setErrorText("That stock is not available for whatever reason.")
    setInterval(() => {
    setErrorText("")
    }, 2000)
  } else {
    setToken(event.target[0].value.toUpperCase());
  var dataX: never[] = []
  setDataX(data.chart.result[0].timestamp)
  // @ts-ignore
  setDataX(data.chart.result[0].timestamp);
  setHigh(data.chart.result[0].indicators.quote[0].high);
  setLow(data.chart.result[0].indicators.quote[0].low);
  setOpen(data.chart.result[0].indicators.quote[0].open);
  setClose(data.chart.result[0].indicators.quote[0].close);
  }
}).catch(err => {
  setErrorText("Invalid Token or something went wrong.")
  setInterval(() => {
  setErrorText("")
  }, 2000)
});
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
	<p className="errorText" id="errorText" >{errorText}</p>

  <Plot
      data={[
        {
          x: useDataX,
          close: useClose,
          low: useLow,
          high: useHigh,
          open: useOpen,
          type: "candlestick",
          name: `${token}`,
          marker: { color: "red" },
          hoverinfo: "x+y",
          increasing: { line: { color: "green" } },
          decreasing: { line: { color: "red" } }
        }
      ]}
      layout={{
        title: `${token}`,
        xaxis: {
          autorange: true,
          title: "Date",
          type: "date"
        },
        yaxis: {
          title: "Price",
          type: "linear"
        }
      }}
    />
{/* <iframe width="900" height="800" frameBorder="0" scrolling="no" title="chart" src="https://plotly.com/~WasteofSpaceYT/1.embed" id="iframe"></iframe> */}

</>
    )
}

export default Chart;