// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var port  	 = process.env.PORT || 8080; 				// set the port
var database = require('./config/database'); 			// load the database config
var morgan   = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// configuration ===============================================================
mongoose.connect(database.url); 	// connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


// routes ======================================================================
require('./app/routes.js')(app);
require('./app/routes2.js')(app);

// rony smarttec
// app.get('', function (req, res) {
// 	  res.sendfile('./public/indexAlarmes.html');
// });
app.get('/', function (req, res) {
  res.sendfile('./public/indexLogin.html');
});
app.get('/login', function (req, res) {
  res.sendfile('./public/indexLogin.html');
});
app.get('/cadastraranalise', function (req, res) {
  res.sendfile('./public/indexAnalisesCadastro.html');
});
app.get('/analises', function (req, res) {
  res.sendfile('./public/index2.html');
});
app.get('/diagnosticos', function (req, res) {
  res.sendfile('./public/indexDiagnostico1.html');
});
// app.get('/diagnostico', function (req, res) {
//   res.sendfile('./public/indexDiagnostico1.html');
// });
app.get('/cadastrarequipamento', function (req, res) {
  res.sendfile('./public/indexEquipamentosCadastro.html');
});
app.get('/equipamentos', function (req, res) {
  res.sendfile('./public/indexE.html');
});
app.get('/alarmes', function (req, res) {
  res.sendfile('./public/index3.html');
});
app.get('/historico', function (req, res) {
  res.sendfile('./public/indexHistorico1.html');
});
app.get('/favoritos', function (req, res) {
  res.sendfile('./public/favoritos.html');
});


// read/write equipamentos



// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);

