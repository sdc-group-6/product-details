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
    const randomShoeMax = process.env.NODE_ENV === 'test' ? 100 : 2499999;
    const randomShoe = 'shoe' + Math.ceil(Math.random() * randomShoeMax);
    const query = typeof window === 'undefined' ? `?p=${randomShoe}` : window.location.search || `?p=${randomShoe}`;
    const queryStart = query.indexOf('=') + 1;
    const productId = queryStart === 0 ? query.substring(1) : query.substring(queryStart);
    this.getOne(productId);
  }

  getAll() {
    axios.get('/shoes')
      .then(shoes => {
        shoes = shoes.data;
        this.setState({shoes});
      })
      .catch(err => {
        console.log('ERROR: ', err);
      });
  }

  getOne(id) {
    // axios.get(`http://localhost:8001/shoes/${id}`)
    axios.get(`/shoes/${id}`)
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
    // axios.get(`http://localhost:8001/looks/${id}`)
    axios.get(`/looks/${id}`)
    .then( looks => {
      looks = {
        pant_name: looks.data[1].name,
        pant_url: looks.data[1].img_url,
        pant_price: looks.data[1].price,
        shirt_name: looks.data[2].name,
        shirt_url: looks.data[2].img_url,
        shirt_price: looks.data[2].price,
        jacket_name: looks.data[0].name,
        jacket_url: looks.data[0].img_url,
        jacket_price: looks.data[0].price
      };
      this.setState({ looks });
    })
    .catch( err => {
      console.log('ERROR: ', err);
    })
  }

  getShares(id) {
    // axios.get(`http://localhost:8001/shares/${id}`)
    axios.get(`/shares/${id}`)
    .then( shares => {
      shares = {
        user1: shares.data[0].user,
        img1: shares.data[0].img,
        user2: shares.data[1].user,
        img2: shares.data[1].img,
        user3: shares.data[2].user,
        img3: shares.data[2].img,
        user4: shares.data[3].user,
        img4: shares.data[3].img,
        user5: shares.data[4].user,
        img5: shares.data[4].img,
      };
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
