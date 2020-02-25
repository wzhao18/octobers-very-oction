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
          handleUserSignUp
        } = this.props;
    
    return (
      <div className="item__bg-image center">
        <Header
          currentUser = {currentUser}
          handleUserLogIn = {handleUserLogIn}
          handleUserSignUp = {handleUserSignUp}
        />
        <ItemView 
          item = {item}
        />

      </div>

    );
  }
}

export default ItemPage;