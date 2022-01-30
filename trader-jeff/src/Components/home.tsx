import React from "react";
import ReactDOM from "react-dom";

function Home(){
    return(
        <div>
        <p>Hello</p>
        </div>
    )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Home />, rootElement);

export default Home;