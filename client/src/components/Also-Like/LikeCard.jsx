import React from 'react';
import Rating from 'react-rating';

const LikeCard = (props) => {
  return (
    <div className="likes-card">
      {props.shoes.map((shoe) => {
        return (
          <div className="card" onClick= {() => props.handleClick(shoe.id)} key={shoe.id}>
            <img className="card-img-top likes d-block" src="https://www.adidas.com/dis/dw/image/v2/aaqx_prd/on/demandware.static/-/Sites-adidas-products/en_US/dwa800131d/zoom/CM8322_00_plp_standard.jpg?sw=276&sh=276&sm=fit&hei=276&wid=276&strip=false"></img>
            <div className="card-body">
              <span className="like-type">{shoe.type}</span><br></br>
              <span className="like-name">{shoe.name}</span><br></br>
              <span className="like-price">${shoe.price}</span><br></br>
              <div className="rating-review">
                <Rating emptySymbol="far fa-star" fullSymbol="fa fa-star" fractions={4} initialRating={Number(shoe.rating)} readonly={true}/>
                <span className="rating">{shoe.review_count}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default LikeCard
