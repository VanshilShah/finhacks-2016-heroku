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
  catagories = [0, 0, 0, 0, 0];
  for(var i = 0; i < user.transactions.length; i++){
    var transaction = user.transactions[i];
    var date = moment(transaction.date, "DD-MM-YYYY");
    catagories[transaction.category].spent = catagories[transaction.category].spent + transaction.value;
    var month = date.get('month');
    months[month] = transaction.value + months[month];
  }
  var lineChartData = {
      labels : [],
      datasets : [
          {
              fillColor : "rgba(220,220,220,0.5)",
              strokeColor : "rgba(220,220,220,1)",
              pointColor : "rgba(220,220,220,1)",
              pointStrokeColor : "#fff",
              data : []
          },
          {
              fillColor : "rgba(151,187,205,0.5)",
              strokeColor : "rgba(151,187,205,1)",
              pointColor : "rgba(151,187,205,1)",
              pointStrokeColor : "#fff",
              data : []
          }
      ]

  };
  for(var i = 0; i < catagories.length; i++){
    lineChartData.labels.push(user.catagories[i].name);
    lineChartData.datasets[0].data.push(user.catagories[i].value);
    lineChartData.datasets[1].data.push(user.catagories[i].max);
  }


  console.log(months[10]);
    res.render('main', {balance: user.balance, transactions: data.users[0].transactions, name: data.users[0].name, regular_transactions: data.users[0].regular_transactions, catagories: catagories, lineChartData: lineChartData});


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
app.get('/payBill', function(req, res){
//  app.use(bodyParser.json());
  console.log(req.body);
  var bill = user.transactions[bill?0:1]
  user.balance = user.balance - bill.value;
  res.send('Bill successfully paid, current balance ' + user.balance);
});app.get('/add', function(req, res){
//  app.use(bodyParser.json());
  console.log(req.body);
  user.balance = user.balance + 300;
  res.send('Bill successfully paid, current balance ' + user.balance);
});
app.post('/', function (req, res) {
  messages.push(req.query.message);
  res.send(req.query.message);
});
