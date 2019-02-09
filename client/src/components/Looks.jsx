import React from 'react';

const Looks = (props) => {
  console.log('props', props.looks)
  return (
    <div className="looks">
      <div className="looks-title">
        <h4> COMPLETE THE LOOK </h4>
      </div>
      <div className="looks-pics">
        <h6><img src="https://www.adidas.com/dis/dw/image/v2/aaqx_prd/on/demandware.static/-/Sites-adidas-products/en_US/dw63a63b52/zoom/DJ3019_21_model.jpg?sh=295&strip=false&sw=295"></img><br></br><br></br>${props.looks.shirt_price}</h6>
        <h6><img src="https://www.adidas.com/dis/dw/image/v2/aaqx_prd/on/demandware.static/-/Sites-adidas-products/en_US/dw1ad515f2/zoom/D73188_000_plp_model.jpg?sh=295&strip=false&sw=295"></img><br></br><br></br>${props.looks.jacket_price}</h6>
        <h6><img src="https://www.adidas.com/dis/dw/image/v2/aaqx_prd/on/demandware.static/-/Sites-adidas-products/en_US/dwb93d38bf/zoom/CF6250_21_model.jpg?sh=295&strip=false&sw=295"></img><br></br><br></br>${props.looks.pant_price}</h6>
      </div>
    </div>
  )
}

export default Looks;
