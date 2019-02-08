import React from 'react';

let Likes = (props) => {
  return (
    <div id="likes">
      {props.shoes.map(shoe => {
        return (
          <div className="card">
            <img className="card-img-top likes" src={shoe.img_url}></img>
            <div className="card-body">
              {shoe.type}<br></br>
              {shoe.name}<br></br>
              ${shoe.price}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Likes;
