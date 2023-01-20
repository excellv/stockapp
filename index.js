// This is a Stock Market App created by Anoop Bara.

const express = require('express');
const app = express();
var exphbs  = require('express-handlebars');
const path =require('path');
const request = require('request')
const PORT = process.env.PORT || 5000;
const otherstuff= "This is some other stuff I am excited about..."
const bodyParser = require('body-parser')

//use body Parser middleware
app.use(bodyParser.urlencoded({extended: false}));

function call_api(finishedAPI, ticker) {
request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_bef2f860dec440b18b166b8d0724dc74', { json: true}, (err, res, body) => {
    if (err) {return console.log(err);}
    if (res.statusCode === 200){
        //console.log(body)
        finishedAPI(body)
    };

});

};




app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
//Set Handlebar GET Route
app.get('/', function (req, res) {
    call_api(function(doneAPI){
        res.render('home', {
        stock: doneAPI
       });

    });
     
    
});
//Set Handlebar POST Route
app.post('/', function (req, res) {
    call_api(function(doneAPI){
        //posted_stuff = req.body.stock_ticker;
        res.render('home', {
        stock: doneAPI,
         
       });

    }, req.body.stock_ticker);
     
    
});
app.get('/about.html', function (req, res) {
    res.render('about');
})

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server listening on port' + PORT));