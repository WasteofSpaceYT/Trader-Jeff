import React from "react";
import ReactDOM from "react-dom";

function ErrorPage(){
    return(
        <div>
        <p>404</p>
        </div>
    )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<ErrorPage />, rootElement);

export default ErrorPage;