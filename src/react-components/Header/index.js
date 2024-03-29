import React from "react";

import "./styles.css";

import { Link } from "react-router-dom";
import SignUp from './../SignUp';
import Login from './../Login';

/* The Header Component */
class Header extends React.Component {

  render() {
    const {
      currentUser,
      handleUserLogIn,
      handleUserSignUp,
      handleUserSignOut
    } = this.props;


    return (
      <div className="header">
        <div className = "logoDiv" >
        <Link className = "logoLink" to={"/"}>
          <img className = "mylogo" src="/img/logo.png"></img>
          </Link> 
        </div>

        <div className = "headDiv" >        
            <h1 className = "title">October's Very Oction</h1>
        </div>
        <div className = "menuDiv">
          <ul className="menu">
            <li>
              <a href="/">About us</a>
            </li>
            <li>
              <SignUp handleUserSignUp = {handleUserSignUp} 
                      handleUserSignOut = {handleUserSignOut} 
                      currentUser = {currentUser}
              />
            </li>
            <li>
             <Login currentUser = {currentUser}
                    handleUserLogIn = {handleUserLogIn}
             />
            </li>
          </ul>
        </div>  
    </div>
    );
  }
}

export default Header;
