// set variables for environment
var express = require('express');
var app = express();
var path = require('path');
var data = require("./data.json");

console.log(data);
// Set server port
var port = process.env.PORT || 3001;
app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
console.log('server is running');

var messages = [];

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); // use either jade or ejs
// instruct express to server up static assets
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('index', {balance: data.users[0].balance});
});
app.get('/login', function(req, res) {
  res.render('login');
});

app.get('/main', function(req, res) {
    res.render('main', {transactions: data.users[0].transactions, name: data.users[0].name});
});

app.get('/getDetails', function(req, res){
  res.send(data.users[0].transactions[0]);
});

app.post('/payBill', function(req, res){
  data.users[0].balance = data.users[0].balance - 234.76;
  res.send('Current balance' + data.users[0].balance);
});

app.post('/', function (req, res) {
  messages.push(req.query.message);
  res.send(req.query.message);
});
