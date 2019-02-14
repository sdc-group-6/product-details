import React, { Component } from 'react';

class Share extends Component {
  constructor(props){
    super(props);
    this.state = {
      user1: false,
      user2: false,
      user3: false,
      user4: false,
      user5: false
    }

    this.handleEnter1 = this.handleEnter1.bind(this);
    this.handleLeave1 = this.handleLeave1.bind(this);
    this.handleEnter2 = this.handleEnter2.bind(this);
    this.handleLeave2 = this.handleLeave2.bind(this);
    this.handleEnter3 = this.handleEnter3.bind(this);
    this.handleLeave3 = this.handleLeave3.bind(this);
    this.handleEnter4 = this.handleEnter4.bind(this);
    this.handleLeave4 = this.handleLeave4.bind(this);
    this.handleEnter5 = this.handleEnter5.bind(this);
    this.handleLeave5 = this.handleLeave5.bind(this);
  }

  handleEnter1() {
    this.setState({user1: true});
  }

  handleLeave1() {
    this.setState({user1: false});
  }

  handleEnter2() {
    this.setState({user2: true});
  }

  handleLeave2() {
    this.setState({user2: false});
  }

  handleEnter3() {
    this.setState({user3: true});
  }

  handleLeave3() {
    this.setState({user3: false});
  }

  handleEnter4() {
    this.setState({user4: true});
  }

  handleLeave4() {
    this.setState({user4: false});
  }

  handleEnter5() {
    this.setState({user5: true});
  }

  handleLeave5() {
    this.setState({user5: false});
  }

  render() {
    let class1 = this.state.user1 ? "share-username" : "share-username hidden";
    let class2 = this.state.user2 ? "share-username" : "share-username hidden";
    let class3 = this.state.user3 ? "share-username" : "share-username hidden";
    let class4 = this.state.user4 ? "share-username" : "share-username hidden";
    let class5 = this.state.user5 ? "share-username" : "share-username hidden";

    return (
      <div className="share">
        <div className="title-1000">
          <h1> SHARE HOW YOU WEAR IT </h1>
          <p className="share-desc">Share a photo of your adidas favorite and appear in our showcase
          below. Make sure to tag your image with @adidas</p>
        </div>
        <div className="col-2-12 justify-content-center share-photo">
          <ul>
            <li>
              <div className="overlay-blk" onMouseEnter={this.handleEnter1} onMouseLeave={this.handleLeave1}>
                <img className= "lrg-share img-fluid" src="https://photorankmedia-a.akamaihd.net/media/8/y/w/8ywuwc4/mobile.jpg"></img>
              </div>
              <span className={class1}>{this.props.shares.user1}</span>
            </li>

          </ul>
          <ul>
            <li>
              <div className="overlay-blk" onMouseEnter={this.handleEnter2} onMouseLeave={this.handleLeave2}>
                <img className="sm-share img-fluid" src="https://z3photorankmedia-a.akamaihd.net/media/3/f/7/3f7ywc4/mobile.jpg"></img>
              </div>
              <span className={class2}>{this.props.shares.user2}</span>
            </li>
            <li><div className="overlay-blk" onMouseEnter={this.handleEnter3} onMouseLeave={this.handleLeave3}> <img className="sm-share img-fluid" src="https://z3photorankmedia-a.akamaihd.net/media/3/f/7/3f7ywc4/mobile.jpg"></img></div><span className={class3}>{this.props.shares.user3}</span></li>
          </ul>
          <ul>
            <li><div className="overlay-blk" onMouseEnter={this.handleEnter4} onMouseLeave={this.handleLeave4}> <img className="sm-share img-fluid" src="https://z3photorankmedia-a.akamaihd.net/media/3/f/7/3f7ywc4/mobile.jpg"></img></div><span className={class4}>{this.props.shares.user4}</span></li>
            <li><div className="overlay-blk" onMouseEnter={this.handleEnter5} onMouseLeave={this.handleLeave5}> <img className="sm-share img-fluid" src="https://z3photorankmedia-a.akamaihd.net/media/3/f/7/3f7ywc4/mobile.jpg"></img></div><span className={class5}>{this.props.shares.user5}</span></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Share;
