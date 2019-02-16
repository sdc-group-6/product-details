import React, { Component } from 'react';
import LikeCard from './LikeCard.jsx'

class Likes extends Component {
  constructor(props){
    super(props);
    this.state = {
      page: 0,
      prev: 'carousel-control-prev hidden',
      next: 'carousel-control-next'
    }
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.changePage = this.changePage.bind(this);
    this.checkPage = this.checkPage.bind(this);
  }

  checkPage() {
    if(this.state.page !== 0) {
      this.setState({prev: 'carousel-control-prev'});
    }
    if(this.state.page === 3) {
      this.setState({next: 'carousel-control-next hidden'})
    }
    if(this.state.page === 0) {
      this.setState({prev: 'carousel-control-prev hidden'});
    }
    if (this.state.page !== 3) {
      this.setState({next: 'carousel-control-next'});
    }
  }

  handleNext() {
    this.setState({page: ++this.state.page}, () => {
      this.checkPage();
    });
  }

  handlePrev() {
    this.setState({page: --this.state.page}, () => {
      this.checkPage();
    });
  }

  changePage(num) {
    this.setState({page: num}, () => {
      this.checkPage();
    });
  }

  render() {
    let shoes1 = this.props.shoes.slice(0,4);
    let shoes2 = this.props.shoes.slice(4,8);
    let shoes3 = this.props.shoes.slice(8,12);
    let shoes4 = this.props.shoes.slice(12,16);

    return (
      <div className="like">
        <div id="carouselLikes" className="carousel slide" data-interval="false" data-wrap="false">
          <ol className="carousel-indicators">
            <li data-target="#carouselLikes" data-slide-to="0" className="active" onClick={() => this.changePage(0)}></li>
            <li data-target="#carouselLikes" data-slide-to="1" onClick={() => this.changePage(1)}></li>
            <li data-target="#carouselLikes" data-slide-to="2" onClick={() => this.changePage(2)}></li>
            <li data-target="#carouselLikes" data-slide-to="3" onClick={() => this.changePage(3)}></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <LikeCard shoes={shoes1} handleClick={this.props.handleClick} />
            </div>
            <div className="carousel-item">
              <LikeCard shoes={shoes2} handleClick={this.props.handleClick} />
            </div>
            <div className="carousel-item">
              <LikeCard shoes={shoes3} handleClick={this.props.handleClick} />
            </div>
            <div className="carousel-item">
              <LikeCard shoes={shoes4} handleClick={this.props.handleClick} />
            </div>
          </div>
          <div className="control-icons">
          <div className="controls">
            <div className="row control-row">
              <a className={this.state.prev} href="#carouselLikes" role="button" data-slide="prev" onClick={this.handlePrev}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              </a>
            </div>
            <div className="row control-row next-pos">
              <a className={this.state.next} href="#carouselLikes" role="button" data-slide="next" onClick={this.handleNext}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
              </a>
            </div>
          </div>
          </div>
        </div>
      </div>
    )
  }
}


export default Likes;
