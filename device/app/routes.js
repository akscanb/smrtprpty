exports = module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  // //lightwallet
  // app.get('/lightwallet', function (req, res, next) {
  //   res.render('index.html');
  // });
  //user ui
  app.get('/user', function (req, res, next) {
    res.render('user.html');
  });
  //display
  app.get('/display', function(req, res, next){
    res.render('display.html');
  });
};
