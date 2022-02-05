import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React from "react";
import { useCookies } from "react-cookie";
import ReactDOM from "react-dom";

function Chart() {
	
	//@ts-ignore
	const drawchart = (event) => {
		event.preventDefault();
		var token = event.target[0].value
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
        <input type="submit" />
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