import React from 'react';

const Share = (props) => {
  return (
    <div>
      <div className="row">
        <h1> SHARE HOW YOU WEAR IT </h1>
        <p className="share">Share a photo of your adidas favorite and appear in our showcase
        below. Make sure to tag your image with @adidas </p>
      </div>
      <div className="col-2-12justify-content-center share-photo">
        <ul>
          <li><div><img className= "lrg-share img-fluid overlay-blk" src="https://photorankmedia-a.akamaihd.net/media/8/y/w/8ywuwc4/mobile.jpg"></img></div></li>
        </ul>
        <ul>
          <li><div> <img className="sm-share img-fluid" src="https://z3photorankmedia-a.akamaihd.net/media/3/f/7/3f7ywc4/mobile.jpg"></img></div></li>
          <li><div> <img className="sm-share img-fluid" src="https://z3photorankmedia-a.akamaihd.net/media/3/f/7/3f7ywc4/mobile.jpg"></img></div></li>
        </ul>
        <ul>
          <li><div> <img className="sm-share img-fluid" src="https://z3photorankmedia-a.akamaihd.net/media/3/f/7/3f7ywc4/mobile.jpg"></img></div></li>
          <li><div> <img className="sm-share img-fluid" src="https://z3photorankmedia-a.akamaihd.net/media/3/f/7/3f7ywc4/mobile.jpg"></img></div></li>
        </ul>
      </div>
    </div>
  )
}


export default Share;
