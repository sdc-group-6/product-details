const Layout = (propsForRender, body) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link rel="shortcut icon" href="https://s3-us-west-1.amazonaws.com/adidas-shoe/adidas-logo-white.png">
      <link rel="stylesheet" type="text/css" href="https://d23lkqa0hnre2j.cloudfront.net/bootstrap.css">
      <link rel="stylesheet" type="text/css" href="https://s3.amazonaws.com/abibasstatics/style.css">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons"rel="stylesheet">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
      <title>Abibas</title>
    </head>
    <body>
      <div id="product-detail">${body}</div>
      <script>window.propsForRender = ${propsForRender}</script>
      <script src="https://s3.amazonaws.com/abibasstatics/bundle.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.slim.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"   integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
      <script type="text/javascript" src="https://d23lkqa0hnre2j.cloudfront.net/bootstrap.min.js"></script>
      <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
      <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    </body>
  </html>
`;
};

export default Layout;