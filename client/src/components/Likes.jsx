import React from 'react';

const Likes = (props) => {
  let shoes1 = props.shoes.slice(0,4);
  let shoes2 = props.shoes.slice(4,8);
  let shoes3 = props.shoes.slice(8,12);
  let shoes4 = props.shoes.slice(12,16);

  return (
    <div className="like">
      <div id="carouselLikes" className="carousel slide" data-ride="carousel" data-interval="false" data-wrap="false">
        <ol className="carousel-indicators">
          <li data-target="#carouselLikes" data-slide-to="0" className="active"></li>
          <li data-target="#carouselLikes" data-slide-to="1"></li>
          <li data-target="#carouselLikes" data-slide-to="2"></li>
          <li data-target="#carouselLikes" data-slide-to="3"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div id="likes">
              {shoes1.map((shoe, i) => {
                return (
                  <div className="card" onClick= {() => props.handleClick(shoe.id)} key={i}>
                    <img className="card-img-top likes d-block" src="https://www.adidas.com/dis/dw/image/v2/aaqx_prd/on/demandware.static/-/Sites-adidas-products/en_US/dwa800131d/zoom/CM8322_00_plp_standard.jpg?sw=276&sh=276&sm=fit&hei=276&wid=276&strip=false"></img>
                    <div className="card-body">
                      <span id="like-type">{shoe.type}</span><br></br>
                      <span id="like-name">{shoe.name}</span><br></br>
                      <span id="like-price">${shoe.price}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="carousel-item">
            <div id="likes">
              {shoes2.map((shoe, i) => {
                return (
                  <div className="card" onClick= {() => props.handleClick(shoe.id)} key={i}>
                    <img className="card-img-top likes d-block" src="https://www.adidas.com/dis/dw/image/v2/aaqx_prd/on/demandware.static/-/Sites-adidas-products/en_US/dwa800131d/zoom/CM8322_00_plp_standard.jpg?sw=276&sh=276&sm=fit&hei=276&wid=276&strip=false"></img>
                    <div className="card-body">
                      <span id="like-type">{shoe.type}</span><br></br>
                      <span id="like-name">{shoe.name}</span><br></br>
                      <span id="like-price">${shoe.price}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="carousel-item">
            <div id="likes">
              {shoes3.map((shoe, i) => {
                return (
                  <div className="card" onClick= {() => props.handleClick(shoe.id)} key={i}>
                    <img className="card-img-top likes d-block" src="https://www.adidas.com/dis/dw/image/v2/aaqx_prd/on/demandware.static/-/Sites-adidas-products/en_US/dwa800131d/zoom/CM8322_00_plp_standard.jpg?sw=276&sh=276&sm=fit&hei=276&wid=276&strip=false"></img>
                    <div className="card-body">
                      <span id="like-type">{shoe.type}</span><br></br>
                      <span id="like-name">{shoe.name}</span><br></br>
                      <span id="like-price">${shoe.price}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="carousel-item">
            <div id="likes">
              {shoes4.map((shoe, i) => {
                return (
                  <div className="card" onClick= {() => props.handleClick(shoe.id)} key={i}>
                    <img className="card-img-top likes d-block" src="https://www.adidas.com/dis/dw/image/v2/aaqx_prd/on/demandware.static/-/Sites-adidas-products/en_US/dwa800131d/zoom/CM8322_00_plp_standard.jpg?sw=276&sh=276&sm=fit&hei=276&wid=276&strip=false"></img>
                    <div className="card-body">
                      <span id="like-type">{shoe.type}</span><br></br>
                      <span id="like-name">{shoe.name}</span><br></br>
                      <span id="like-price">${shoe.price}</span>
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
            <a className="carousel-control-prev" href="#carouselLikes" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
          </div>
          <div className="row control-row next-pos">
            <a className="carousel-control-next" href="#carouselLikes" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Likes;
