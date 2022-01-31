import { NavLink, Outlet } from "react-router-dom";
import react, { useContext } from "react";
import AuthContext from './authcontext';
import logo from "../logo.png"
import "./styles.css"

const Layout = () => {
  function setRedirect() {
    auth.redirect = window.location.pathname;
  }
  const auth = useContext(AuthContext);
  console.log(auth.redirect);
  return (
    <>
      <nav className="navbar">
        <NavLink to="/"><img src={logo} alt="" className="navlogo"></img></NavLink>
        <NavLink to="/charts"><button className="button1">Charts</button></NavLink>
        {auth.auth ? <a id="profileIcon" className="alignright"><img src={logo} style={{ width: "50px", height: "50px", borderRadius: 50 / 2 }}
        /></a> : <header className="alignright">
        <NavLink to="/login" ><button className="button1" onClick={setRedirect}>Login</button></NavLink>
        <NavLink to="/signup"><button className="button1">Sign-up</button></NavLink>
      </header>}
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;