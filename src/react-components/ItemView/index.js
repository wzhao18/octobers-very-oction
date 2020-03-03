import React from "react";

import "./styles.css";
import {getAllItems} from '../../Model/Merchandise';
import ItemData from '../ItemData';
import PriceList from '../PriceList';


/* The ItemView Component */
class ItemView extends React.Component {

  state = {
    shown: false,
    bid: false,
    sell: false
  };

  showPopUp = (e) => {
    if(e.target.classList.contains("buy-btn")){
      this.setState({
        shown: true,
        bid: true,
        sell: false
      });
    }
    else{
      this.setState({
        shown: true,
        bid: false,
        sell: true
      });
    }
  }


  closePopUp = () => {
    this.setState({
      shown: false,
    });
  }

  cancelPopUp = (e) => {
    const backgroundDiv = document.querySelector("#background-div");
    if(e.target === backgroundDiv) {
      this.closePopUp()
    }
  }


  render() {
    let {
      item,
      currentUser
    } = this.props;

    if(item == null){
      item = getAllItems()[0];
    }

    const submit = (e) => {
      e.preventDefault();
      if(currentUser == null){
        alert("please log in")
        return
      }
      const price = parseInt(document.querySelector("#price").value);
      if(price <= 0){
        alert("invalid price")
      }
      if(this.state.bid){
        item.addBid(price, currentUser)
      }
      else{
        item.addAsk(price, currentUser)
      }
      alert("good");
      this.closePopUp()
    };


    let popup;
    if(this.state.shown) {
      popup = (
        <div className="popup-background" id="background-div" onClick={this.cancelPopUp}>
          <div className="popup" id="login-div">
          <form onSubmit={submit}>
            <label htmlFor="price">Price</label>
            <input type="text" id="price" name="price"></input><br/>
            <button type = "submit">Confirm</button>        
          </form>
        </div>
        </div>
      );
    };

    

    return (
      <div>
        <div className="container">
          <div className="left-column">
                  <img src={item.itemImageSrc}/>
              </div>
        
              
              <div className="right-column">
            
                  <div className="product-description">
                      <span>{item.itemCategory}</span>
                      <h1>{item.itemName}</h1>
                      <p>{item.itemDescription} </p>
                  </div>

              
                  <div className="product-price">
                      <span id = "bidPrice">{"$" + item.getLowestAsk()}</span>
                      <a className="buy-btn" onClick = {this.showPopUp}>Bid</a>
                      <span id = "sellPrice">{"$" + item.getHighestBid()}</span>
                      <a className="sell-btn" onClick = {this.showPopUp}>Sell</a>
                  </div>

                  <PriceList item={item} isBid={true}></PriceList>
                  <PriceList item={item} isBid={false}></PriceList>
              </div>
          

              {popup}

        
        </div>
        <ItemData item = {item}
        />
      </div>

    );
  }
}

export default ItemView;
