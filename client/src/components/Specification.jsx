import React from 'react';

const Specification = (props) => {
  return (
    <div className="details container">
      <div className="row">
        <div className="col-sm first-col">
          <ul>
            {props.details.slice(0,Math.floor(props.details.length/2)).map((detail, i) => {
              return (
                <li key={i}>{detail}</li>
              )
            })}
          </ul>
        </div>
        <div className="col-sm sec-col">
          <ul>
            {props.details.slice(Math.floor(props.details.length/2)).map((detail, i) => {
              return (
                <li key={i}>{detail}</li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Specification;
