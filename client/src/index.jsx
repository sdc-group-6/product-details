import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navbar from 'react-bootstrap/Navbar';
import Likes from './components/Likes.jsx';
import Description from './components/Description.jsx';
import Specification from './components/Specification.jsx';
import $ from 'jquery';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      image: [],
      shoes: [],
      desc: true,
      spec: false
    }

    this.descClick = this.descClick.bind(this);
    this.specClick = this.specClick.bind(this);
  }

  componentDidMount() {
    this.get();
  }

  get () {
    $.ajax({
      url: `http://localhost:8001/shoes`,
      method: 'GET',
      success: shoes => {
        console.log("SUCCESS", shoes)
        this.setState({shoes})
      },
      error: err => {
        console.log("ERROR", err);
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

  render() {
    let descClass = this.state.desc ? 'detail selected' : 'detail unselected';
    let specClass = this.state.spec ? 'detail selected' : 'detail unselected';
    // <Likes shoes={this.state.shoes} />
    return (
      <div>
        <h4> COMPLETE THE LOOK </h4>
        <div className="product">
          <h1> PRODUCT DETAILS </h1>
          <div className="details">
            <div className={descClass} onClick={this.descClick}>DESCRIPTION</div>
            <div className={specClass} onClick={this.specClick}>SPECIFICATIONS</div>
          </div>
        </div>
        <h3> YOU MAY ALSO LIKE </h3>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
