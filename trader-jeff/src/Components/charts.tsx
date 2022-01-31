import React from "react";
import ReactDOM from "react-dom";

function Chart(){
	/*
	function getGraph(token:string){
	}
	*/
	
	//var activeToken = "BTC"
/*
    //@ts-ignore
	document.getElementById("tokenfield").placeholder = activeToken
    //@ts-ignore
	document.getElementById("drawChartButton").addEventListener('click', () => {
        //@ts-ignore
		if(document.getElementById("tokenfield").value !== ""){
            //@ts-ignore
            activeToken = document.getElementById("tokenfield").value
            //@ts-ignore
            document.getElementById("tokenfield").placeholder = activeToken
                //@ts-ignore

		document.getElementById('iframe').contentWindow.location.reload(true);
		//$('#iframe').contentWindow.location.reload(true);
		getGraph("APPL")
		} else {
                //@ts-ignore
			document.getElementById("errorText").innerText = "You must enter a stock symbol."
			setTimeout(() => {
                //@ts-ignore
			document.getElementById("errorText").innerText = ""
			}, 1000)
		}
	})	
*/
    return(
<>
<meta charSet="utf-8" />
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossOrigin="anonymous" />
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossOrigin="anonymous"></script>
	<script src="jquerry.js"></script>
<title>Paper Plate</title>




<br />
<header>
  <input id="tokenfield" />
  <button id="drawChartButton">Draw Chart</button>
	<br />
	<p className="errorText" id="errorText"></p>
</header>
<iframe width="900" height="800" frameBorder="0" scrolling="no" title="chart" src="https://plotly.com/~WasteofSpaceYT/1.embed" id="iframe"></iframe>

</>
    )
}

export default Chart;