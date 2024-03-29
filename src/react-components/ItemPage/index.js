import React from "react";

import "./styles.css";

import Header from '../Header';
import ItemView from '../ItemView';

/* The ItemPage Component */
class ItemPage extends React.Component {

  render() {
    const {currentUser, 
          item,
          handleUserLogIn,
          handleUserSignUp,
          handleUserSignOut,
          handleUserFunction
        } = this.props;

    return (
      <div className="item__bg-image center">
        <Header
          currentUser = {currentUser}
          handleUserLogIn = {handleUserLogIn}
          handleUserSignUp = {handleUserSignUp}
          handleUserSignOut = {handleUserSignOut}
        />
        <ItemView 
          item = {item}
          currentUser = {currentUser}
          handleUserFunction = {handleUserFunction}
        />

      </div>

    );
  }
}

export default ItemPage;
