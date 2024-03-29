import {addOrder} from "./Order";
import {getItems, itemAddBid, itemAddAsk, itemRemoveBid, itemRemoveAsk, getItemsByKeyword, getItemsByKeywordAndCategory, getItemsByCategory, itemAddOrder} from '../actions/handleMerchandise'
import {addToPurchase, addToSelling, addMessageToDb} from "../actions/handleUser"

class Merchandise{
  constructor(itemId, itemName, itemCategory, itemDescription, itemImageSrc) {
    this.itemId = itemId;
    this.itemName = itemName;
    this.itemCategory = itemCategory;
    this.itemDescription = itemDescription;
    this.itemImageSrc = itemImageSrc;
    this.bids = {}; // price : [userids]
    this.asks = {}; // price : [userids]
    this.orderHistory = []; //orderids
  }

  getLowestAsk = function (){
    const arr = Object.keys(this.asks);
    const data = []
    for (let i = 0; i< arr.length; i++){
      data.push(parseInt(arr[i]));

    }
    if (arr.length == 0){
      return "N/A"
    }
    const result =  Math.min.apply(null, data)

    return result
  }

  //return id of seller
  getLowestAskSeller = function(){
    const price = this.getLowestAsk();
    return this.asks[price][0]
  }

  getHighestBid = function(){
    const arr = Object.keys(this.bids);
    const data = []
    for (let i = 0; i< arr.length; i++){
      data.push(parseInt(arr[i]));
    }
    if (arr.length == 0){
      return "N/A"
    }
    const result =  Math.max.apply(null, data)
    return result
  }

  //return id of buyer
  getHighestBidBuyer = function (){
    const price = this.getHighestBid();
    return this.bids[price][0]
  }

  addBid = async function(price, userId){
    if (Object.keys(this.asks).length > 0 && price >= this.getLowestAsk()){
      const sellerId = this.getLowestAskSeller();
      const price = this.getLowestAsk();
      await itemRemoveAsk(this.itemId, price, sellerId)
      for (let i = 0; i < this.asks[price].length; i++){
        if (this.asks[price][i] == sellerId){
          this.asks[price].splice(i, 1)
            break;
        }
      }
      if(this.asks[price].length == 0){
        delete this.asks[price]
      }
      const order = await addOrder(this.itemId, userId, sellerId, price)
      this.orderHistory.push(order._id)
      await itemAddOrder(this.itemId, order._id)
      await addToPurchase(userId, order._id)
      await addToSelling(sellerId, order._id)
      const message = {
        title: "Bid Successfully placed",
        date: new Date(),
        content: "You have successfully place a bid of $" + price + " on " + this.itemName
      }
      await addMessageToDb(userId, message)
      const messageToBuyer = {
        title: "New order Confirmation",
        date: new Date(),
        content: "You have successfully purchased " + this.itemName + " for $" + price + ". You will receive further notices from us once the item has been shipped to us."
      }
      await addMessageToDb(userId, messageToBuyer)
      const messageToSeller = {
        title: "New order Confirmation",
        date: new Date(),
        content: "Your listed item " + this.itemName + " has been purchased. Please deliver your item to Bahen Center."
      }
      await addMessageToDb(sellerId, messageToSeller)
    }
    else{
      await itemAddBid(this.itemId, price, userId)
      const message = {
        title: "Bid Successfully placed",
        date: new Date(),
        content: "You have successfully place a bid of $" + price + " on " + this.itemName
      }
      await addMessageToDb(userId, message)
      if (price in this.bids){
        this.bids[price].push(userId)
      }
      else{
        this.bids[price] = [userId]
      }
    }    
 
  }

  addAsk = async function(price, userId){
    if (Object.keys(this.bids).length > 0 && price <= this.getHighestBid()){
      const buyerId = this.getHighestBidBuyer();
      const price = this.getHighestBid();
      await itemRemoveBid(this.itemId, price, buyerId)
      for (let i = 0; i < this.bids[price].length; i++){
        if (this.bids[price][i] == buyerId){
          this.bids[price].splice(i, 1)
            break;
        }
      }
      if(this.bids[price].length == 0){
        delete this.bids[price]
      }
      const order = await addOrder(this.itemId, buyerId, userId, price)
      this.orderHistory.push(order._id)
      await itemAddOrder(this.itemId, order._id)
      await addToPurchase(buyerId, order._id)
      await addToSelling(userId, order._id)
      const message = {
        title: "Ask Successfully placed",
        date: new Date(),
        content: "You have successfully place an ask of $" + price + " on " + this.itemName
      }
      await addMessageToDb(userId, message)
      const messageToSeller = {
        title: "New order Confirmation",
        date: new Date(),
        content: "Your listed item " + this.itemName + " has been purchased. Please deliver your item to Bahen Center."
      }
      await addMessageToDb(userId, messageToSeller)
      const messageToBuyer = {
        title: "New order Confirmation",
        date: new Date(),
        content: "You have successfully purchased " + this.itemName + " for $" + price + ". You will receive further notices from us once the item has been shipped to us."
      }
      await addMessageToDb(buyerId, messageToBuyer)
    }
    else{
      await itemAddAsk(this.itemId, price, userId)
      const message = {
        title: "Ask Successfully placed",
        date: new Date(),
        content: "You have successfully place an ask of $" + price + " on " + this.itemName
      }
      await addMessageToDb(userId, message)
      if (price in this.asks){
        this.asks[price].push(userId)
      }
      else{
        this.asks[price] = [userId]
      }
    }  
  }

    getAllAsks = function () {
      const arr = Object.keys(this.asks);
      const result = [];
      for (let i = 0; i< arr.length; i++){
        for (let j = 0; j < this.asks[arr[i]].length; j++){
          result.push(parseInt(arr[i]));
        }
      }
      return result;
    }

    getAllBids = function () {
      const arr = Object.keys(this.bids);
      const result = [];
      for (let i = 0; i< arr.length; i++){
        for (let j = 0; j < this.bids[arr[i]].length; j++){
          result.push(parseInt(arr[i]));
        }
      }
      return result;
    }
}

export async function getFilterItems(word,category){
  let items;
  if(word == "" && category != null){
    items = await getItemsByCategory(category)
  }
  else if(category != null){
    items = await getItemsByKeywordAndCategory(word, category)
  }
  else if(word != ""){
    items = await getItemsByKeyword(word)
  }
  else{
    items = await getItems()
  }
  const result = []
  items.map((item) => {
    let obj = new Merchandise(item._id, item.itemName, item.itemCategory, item.itemDescription, item.itemImageSrc)
    const asks = Object.keys(item.asks)
    asks.map((ask) => {
      if (item.asks[ask].length > 0){
        obj.asks[ask] = item.asks[ask]
      }
    })
    const bids = Object.keys(item.bids)
    bids.map((bid) => {
      if (item.bids[bid].length > 0){
        obj.bids[bid] = item.bids[bid]
      }
    })
    item.orderHistory.map((order) => {
      obj.orderHistory.push(order)
    })
    result.push(obj)
  })
  return result
}

export default Merchandise;