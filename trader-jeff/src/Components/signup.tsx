//import react from "react"
import ReactDOM from "react-dom";
//import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function Signup() {
    /*
const auth = getAuth();
var email = "dudeman";
var password = "";
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  */
  return(
      <p>Hewo</p>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Signup />, rootElement);

export default Signup;