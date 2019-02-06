import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navbar from 'react-bootstrap/Navbar';
import $ from 'jquery';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      image: []
    }
  }

  render() {
    return (
      <div>
        <h4> COMPLETE THE LOOK </h4>
        <h3> PRODUCT DETAILS </h3>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
