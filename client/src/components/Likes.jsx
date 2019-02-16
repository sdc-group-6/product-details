import React, { Component } from 'react';
import Rating from 'react-rating';

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
              <div id="likes">
                {shoes1.map((shoe) => {
                  return (
                    <div className="card" onClick= {() => this.props.handleClick(shoe.id)} key={shoe.id}>
                      <img className="card-img-top likes d-block" src="https://www.adidas.com/dis/dw/image/v2/aaqx_prd/on/demandware.static/-/Sites-adidas-products/en_US/dwa800131d/zoom/CM8322_00_plp_standard.jpg?sw=276&sh=276&sm=fit&hei=276&wid=276&strip=false"></img>
                      <div className="card-body">
                        <span id="like-type">{shoe.type}</span><br></br>
                        <span id="like-name">{shoe.name}</span><br></br>
                        <span id="like-price">${shoe.price}</span><br></br>
                        <div className="rating-review">
                          <Rating emptySymbol="far fa-star" fullSymbol="fa fa-star" fractions={5} initialRating={Number(shoe.rating)} readonly={true}/>
                          <span className="rating">{shoe.review_count}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="carousel-item">
              <div id="likes">
                {shoes2.map((shoe) => {
                  return (
                    <div className="card" onClick= {() => this.props.handleClick(shoe.id)} key={shoe.id}>
                      <img className="card-img-top likes d-block" src="https://www.adidas.com/dis/dw/image/v2/aaqx_prd/on/demandware.static/-/Sites-adidas-products/en_US/dwa800131d/zoom/CM8322_00_plp_standard.jpg?sw=276&sh=276&sm=fit&hei=276&wid=276&strip=false"></img>
                      <div className="card-body">
                        <span id="like-type">{shoe.type}</span><br></br>
                        <span id="like-name">{shoe.name}</span><br></br>
                        <span id="like-price">${shoe.price}</span><br></br>
                        <div className="rating-review">
                          <Rating emptySymbol="far fa-star" fullSymbol="fa fa-star" fractions={5} initialRating={Number(shoe.rating)} readonly={true}/>
                          <span className="rating">{shoe.review_count}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="carousel-item">
              <div id="likes">
                {shoes3.map((shoe) => {
                  return (
                    <div className="card" onClick= {() => this.props.handleClick(shoe.id)} key={shoe.id}>
                      <img className="card-img-top likes d-block" src="https://www.adidas.com/dis/dw/image/v2/aaqx_prd/on/demandware.static/-/Sites-adidas-products/en_US/dwa800131d/zoom/CM8322_00_plp_standard.jpg?sw=276&sh=276&sm=fit&hei=276&wid=276&strip=false"></img>
                      <div className="card-body">
                        <span id="like-type">{shoe.type}</span><br></br>
                        <span id="like-name">{shoe.name}</span><br></br>
                        <span id="like-price">${shoe.price}</span><br></br>
                        <div className="rating-review">
                          <Rating emptySymbol="far fa-star" fullSymbol="fa fa-star" fractions={5} initialRating={Number(shoe.rating)} readonly={true}/>
                          <span className="rating">{shoe.review_count}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="carousel-item">
              <div id="likes">
                {shoes4.map((shoe) => {
                  return (
                    <div className="card" onClick= {() => this.props.handleClick(shoe.id)} key={shoe.id}>
                      <img className="card-img-top likes d-block" src="https://www.adidas.com/dis/dw/image/v2/aaqx_prd/on/demandware.static/-/Sites-adidas-products/en_US/dwa800131d/zoom/CM8322_00_plp_standard.jpg?sw=276&sh=276&sm=fit&hei=276&wid=276&strip=false"></img>
                      <div className="card-body">
                        <span id="like-type">{shoe.type}</span><br></br>
                        <span id="like-name">{shoe.name}</span><br></br>
                        <span id="like-price">${shoe.price}</span><br></br>
                        <div className="rating-review">
                          <Rating emptySymbol="far fa-star" fullSymbol="fa fa-star" fractions={5} initialRating={Number(shoe.rating)} readonly={true}/>
                          <span className="rating">{shoe.review_count}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
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
