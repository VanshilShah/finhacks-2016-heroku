// set variables for environment
var express = require('express');
var app = express();
var path = require('path');
var data = require("./data.json");
var moment = require('moment');
var userIndex = 0;
var user = data.users[userIndex];
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
  months = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
  for(var i = 0; i < user.transactions.length; i++){
    var transaction = user.transactions[i];
    var date = moment(transaction.date, "DD-MM-YYYY");
    var month = date.get('month');
    months[month] = transaction.value + months[month];
  }

  console.log(months[10]);
    res.render('main', {transactions: data.users[0].transactions, name: data.users[0].name, regular_transactions: data.users[0].regular_transactions});
});

app.get('/getDetails', function(req, res){
  res.send(data.users[0].transactions[0]);
});

app.post('/payBill', function(req, res){
  data.users[userIndex].balance = data.users[userIndex].balance - 23.76;
  res.send('Current balance' + data.users[userIndex].balance);
});

app.post('/', function (req, res) {
  messages.push(req.query.message);
  res.send(req.query.message);
});
