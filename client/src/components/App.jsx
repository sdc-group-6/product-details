import React, { Component } from 'react';
import Topbar from './Navbar/Topbar.jsx';
import Likes from './Also-Like/Likes.jsx';
import Looks from './Complete-Look/Looks.jsx';
import Description from './Product-Details/Description.jsx';
import Specification from './Product-Details/Specification.jsx';
import Share from './Share/Share.jsx';
import $ from 'jquery';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      looks: [],
      shoes: [],
      shoe: {},
      details: [],
      shares: [],
      desc: true,
      spec: false,
      cart: 0
    }

    this.descClick = this.descClick.bind(this);
    this.specClick = this.specClick.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.getOne = this.getOne.bind(this);
    this.getShares = this.getShares.bind(this);
  }

  componentDidMount() {
    let id = Math.floor(Math.random() * (101));
    this.getOne(id);
  }

  getAll () {
    $.ajax({
      url: `http://localhost:8001/shoes`,
      method: 'GET',
      success: shoes => {
        console.log("SUCCESS", shoes)
        this.setState({shoes})
      },
      error: err => {
        console.log('ERROR: ', err);
      }
    })
  }

  getOne (id) {
    $.ajax({
      url: `http://localhost:8001/shoes/${id}`,
      method: 'GET',
      success: shoe => {
        console.log("SUCCESS", shoe);
        this.getLooks(id);
        this.getShares(id);
        this.getAll();
        this.setState({details: shoe.details.split(';'),
                      shoe,
                      desc: true,
                      spec: false
                      });
      },
      error: err => {
        console.log('ERROR: ', err);
      }
    })
  }

  getLooks (id) {
    $.ajax({
      url: `http://localhost:8001/looks/${id}`,
      method: 'GET',
      success: looks => {
        console.log("SUCCESS", looks);
        this.setState({looks})
      },
      error: err => {
        console.log('ERROR: ', err);
      }
    })
  }

  getShares (id) {
    $.ajax({
      url: `http://localhost:8001/shares/${id}`,
      method: 'GET',
      success: shares => {
        console.log("SUCCESS shares", shares);
        this.setState({shares})
      },
      error: err => {
        console.log('ERROR: ', err);
      }
    })
  }

  descClick () {
    this.setState({desc : true, spec : false});
  }

  specClick () {
    this.setState({desc : false, spec : true});
  }

  addToCart () {
    this.setState({cart: ++this.state.cart})
  }

  render() {
    let descClass = this.state.desc ? 'detail selected' : 'detail unselected';
    let specClass = this.state.spec ? 'detail selected' : 'detail unselected';
    let showDesc = this.state.desc ? <Description shoe={this.state.shoe} /> : <Specification details={this.state.details} />;

    return (
      <div>
        <Topbar cart={this.state.cart}/>
        <Looks looks={this.state.looks} add={this.addToCart}/>
        <div className="product">
          <div className="title-1000">
            <h1> PRODUCT DETAILS </h1>
          </div>
          <div className="details">
            <div className={descClass} id="desc" onClick={this.descClick}>DESCRIPTION</div>
            <div className={specClass} id="spec" onClick={this.specClick}>SPECIFICATIONS</div>
          </div>
          {showDesc}
        </div>
        <div className="product">
          <div className="title-1000">
            <h1> YOU MAY ALSO LIKE </h1>
          </div>
        </div>
        <Likes shoes={this.state.shoes} handleClick={this.getOne}/>
        <Share shares={this.state.shares}/>
      </div>
    )
  }
}

export default App;
