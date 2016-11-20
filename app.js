// set variables for environment
var express = require('express');
var bodyParser = require('body-parser');
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

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

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

var bill = false;

app.post('/getBill', function(req, res){
  bill = !bill;
  var bill = user.regular_transactions[bill?0:1];
  res.send("We are expecting that you will have a bill due to " + bill.to + " next week with a value of $" + bill.value + ". Would you like to pay the bill?");
});

app.post('/getDetails', function(req, res){
  var bill = user.transactions[bill?0:1];
  res.send("Bill to: " + bill.to + ". Due on the " + bill.day + "th. Payment of: " + bill.value);
});

app.post('/payBill', function(req, res){
//  app.use(bodyParser.json());
  console.log(req.body);
  var bill = user.transactions[bill?0:1]
  user.balance = user.balance - bill.value;
  res.send('Bill successfully paid, current balance ' + user.balance);
});

app.post('/', function (req, res) {
  messages.push(req.query.message);
  res.send(req.query.message);
});
