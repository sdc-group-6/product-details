import React, { Component } from 'react';

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shop: false
    }
  }

  render() {
    let cart = this.props.cart === 0 ? '' : this.props.cart;
    let iconClass = this.props.cart === 0 ? 'material-icons md-light' : 'material-icons md-light cartIcon';
    let cartClass = this.props.cart === 0 ? '' : 'cart';
    return (
      <div className="sticky-top">
        <div className="topBar">
          <div className="help white">
            <li> HELP</li>
            <li> | </li>
            <li> ORDER TRACKER AND RETURNS</li>
            <li> | </li>
            <li id="fbold"> NEWSLETTER SIGNUP</li>
            <li> LOGIN</li>
            <li></li>
            <i className="material-icons md-light">person</i>
          </div>
        </div>
        <div className="bBar">
          <img src="../images/adidas-logo-white.png" width="75" height="75" className="nav-logo d-inline-block align-top"></img>
          <div className="choices white">
            <li> MENS</li>
            <li> WOMENS</li>
            <li> KIDS</li>
            <li> | </li>
            <li> SPORTS</li>
            <li> BRANDS</li>
          </div>
          <div className="search white">
            <span id="search-box"><i className="material-icons">search</i></span>
            <input type="text" placeholder="search"></input>
            <li></li>
            <div className={cartClass}><i className={iconClass}>shopping_cart</i><span className="cartNum">{cart}</span></div>
          </div>
        </div>
        <div className="shipping">
          <h6>
            <i className="material-icons delivery" height="24" width="24">local_shipping</i>
            <span className="underline">FREE SHIPPING AND RETURNS</span>
            <img className="creators"src="../images/adidas-icon-creator.png" width="24" height="24"></img>
            <span className="underline">CREATORS GET REWARDED - JOIN THE NEW ADIDAS CREATOR CLUB</span>
          </h6>
        </div>
      </div>
    )
  }
}

export default Topbar;
