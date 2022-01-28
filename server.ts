import * as http from "http";
import "plotly"
import * as yfinance from "yfinance"

import { getFirestore, getDoc, doc, updateDoc, setDoc } from "firebase/firestore"
import { initializeApp } from "firebase/app";

async function initializefirebase() {
    const firebaseConfig = {
        apiKey: "AIzaSyCoik6dAfUPkjTD4ediiG7phRzH3VKhthk",
        authDomain: "paper-plate-5ab88.firebaseapp.com",
        projectId: "paper-plate-5ab88",
        storageBucket: "paper-plate-5ab88.appspot.com",
        messagingSenderId: "514869257382",
        appId: "1:514869257382:web:374d1bd4bbeff81aa14067",
        measurementId: "G-HJRSQKL6KM"
    };
    const firebaseApp = initializeApp(firebaseConfig);

    const app = getFirestore();
}
//@ts-ignore
initializefirebase();

var host = "localhost";
var port = 3000

function getChart(token: string){
    //
}

const requestListener = function(req: any, res: any) {
if(req.url == "/chart"){

}
if(req.url == "/buy"){

}
if(req.url == "/sell"){

}
if(req.url == "/getBal"){

}
}
// create a new http server
const serverr = http.createServer(requestListener);
serverr.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});