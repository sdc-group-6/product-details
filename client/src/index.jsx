import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Topbar from './components/Topbar.jsx';
import Likes from './components/Likes.jsx';
import Looks from './components/Looks.jsx';
import Description from './components/Description.jsx';
import Specification from './components/Specification.jsx';
import Share from './components/Share.jsx';
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
  }

  componentDidMount() {
    this.getAll();
    let id = Math.floor(Math.random() * (101));
    this.getOne(id);
    this.getLooks(id);
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
        this.setState({details: shoe.details.split(';')});
        this.setState({shoe});
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

  descClick () {
    this.setState({desc : true});
    this.setState({spec : false});
  }

  specClick () {
    this.setState({desc : false});
    this.setState({spec : true});
  }

  addToCart () {
    console.log(this.state.cart++);
    this.setState({cart: this.state.cart++})
    console.log('after', this.state.cart);
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
          <h1> PRODUCT DETAILS </h1>
          <div className="details">
            <div className={descClass} id="desc" onClick={this.descClick}>DESCRIPTION</div>
            <div className={specClass} id="spec" onClick={this.specClick}>SPECIFICATIONS</div>
          </div>
          {showDesc}
        </div>
        <h1> YOU MAY ALSO LIKE </h1>
        <Likes shoes={this.state.shoes} />
        <Share shares={this.state.shares}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
