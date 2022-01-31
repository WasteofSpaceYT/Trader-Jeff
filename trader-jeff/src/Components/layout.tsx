import { Outlet } from "react-router-dom";
import react, { useContext } from "react";
import AuthContext from './authcontext';
import logo from "../logo.png"
import "./styles.css"

const Layout = () => {
  const auth = useContext(AuthContext);
  console.log(auth.auth)
  return (
    <>
      <nav className="navbar">
        <a href="/"><img src={logo} alt="" className="navlogo"></img></a>
        {auth.auth ? <a id="profileIcon" className="alignright"><img src={logo} style={{ width: "50px", height: "50px", borderRadius: 50 / 2 }}
        /></a> : <header className="alignright">
        <a href="/login"><button className="button1">Login</button></a>
        <a href="/signup"><button className="button1">Sign-up</button></a>
      </header>}
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;