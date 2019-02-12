import React, { Component } from 'react';

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: ''
    }
  }

  render() {
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
            <i className="material-icons md-light">shopping_cart</i>
          </div>
        </div>
      </div>
    )
  }
}

export default Topbar;
