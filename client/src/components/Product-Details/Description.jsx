import React from 'react';

const Description = (props) => {
  return (
    <div className = "container">
      <div className="row">
        <div className="col-sm shoe-desc">
          <h2 className="detail-name">{props.shoe.name}</h2>
          <h5 className = "short-desc">{props.shoe.short_desc}</h5>
          <p className= "para">{props.shoe.long_desc}</p>
        </div>
        <div className="col-sm shoe-img">
          <img src="https://assets.adidas.com/images/w_840,h_840,f_auto,q_auto:sensitive,fl_lossy/29ffefeadfb448bfae6ba93b007c3f38_9366/POD-S3_1_Shoes_Black_G54741_04_standard.jpg" width="420" height="420"></img>
        </div>
      </div>
    </div>
  )
}

// const Description = (props) => {
//   return (
//     <div className = "container">
//       <div className="row">
//         <div className="col-sm shoe-desc">
//           <h2 className="detail-name">{props.shoe.name}</h2>
//           <h5 className = "short-desc">{props.shoe.short_desc}</h5>
//           <p className= "para">{props.shoe.long_desc}</p>
//         </div>
//         <div className="col-sm shoe-img">
//           <img src={props.shoe.img_url} width="420" height="420"></img>
//         </div>
//       </div>
//     </div>
//   )
// }

export default Description;
