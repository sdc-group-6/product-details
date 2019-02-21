import React, { Component } from 'react';
import axios from 'axios';
import Topbar from './Navbar/Topbar';
import Likes from './Also-Like/Likes';
import Looks from './Complete-Look/Looks';
import Description from './Product-Details/Description';
import Specification from './Product-Details/Specification';
import Share from './Share-Photos/Share';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      looks: {},
      shoes: [],
      shoe: {},
      details: [],
      shares: {},
      desc: true,
      spec: false,
      cart: 0,
    };

    this.descClick = this.descClick.bind(this);
    this.specClick = this.specClick.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.getOne = this.getOne.bind(this);
    this.getShares = this.getShares.bind(this);
  }

  componentDidMount() {
    const id = Math.floor(Math.random() * (101));
    this.getOne(11);
  }

  getAll() {
    axios.get('/shoes')
      .then(shoes => {
        shoes = shoes.data;
        this.setState({shoes});
      })
      .catch(err => {
        console.log('ERROR: ', err);
      })
  }

  getOne(id) {
    axios.get(`http://localhost:8001/shoes/${id}`)
    .then( shoe => {
      shoe = shoe.data;
      this.getLooks(id);
      this.getShares(id);
      this.getAll();
      this.setState({
        details: shoe.details.split(';'),
        shoe,
        desc: true,
        spec: false,
      });
    })
    .catch( err => {
      console.log('ERROR: ', err);
    })
  }

  getLooks(id) {
    axios.get(`http://localhost:8001/looks/${id}`)
    .then( looks => {
      looks = looks.data;
      this.setState({ looks });
    })
    .catch( err => {
      console.log('ERROR: ', err);
    })
  }

  getShares(id) {
    axios.get(`http://localhost:8001/shares/${id}`)
    .then( shares => {
      shares = shares.data;
      this.setState({ shares });
    })
    .catch( err => {
      console.log('ERROR: ', err);
    })
  }

  descClick() {
    this.setState({ desc: true, spec: false });
  }

  specClick() {
    this.setState({ desc: false, spec: true });
  }

  addToCart() {
    this.setState({ cart: ++this.state.cart });
  }

  render() {
    const descClass = this.state.desc ? 'detail selected' : 'detail unselected';
    const specClass = this.state.spec ? 'detail selected' : 'detail unselected';

    return (
      <div>
        <Topbar cart={this.state.cart} />
        <div id="top-navbar"></div>
        <Looks looks={this.state.looks} add={this.addToCart} />
        <div className="product">
          <div className="title-1000">
            <h1> PRODUCT DETAILS </h1>
          </div>
          <div className="details">
            <div className={descClass} id="desc" onClick={this.descClick}>DESCRIPTION</div>
            <div className={specClass} id="spec" onClick={this.specClick}>SPECIFICATIONS</div>
          </div>
          {this.state.desc ? <Description shoe={this.state.shoe} /> : <Specification details={this.state.details} />}
        </div>
        <div className="product">
          <div className="title-1000">
            <h1> YOU MAY ALSO LIKE </h1>
          </div>
        </div>
        <Likes shoes={this.state.shoes} handleClick={this.getOne} />
        <Share shares={this.state.shares} />
      </div>
    );
  }
}

export default App;
