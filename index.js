const express = require('express');
const app = express();
var exphbs  = require('express-handlebars');
const path =require('path');

const PORT = process.env.PORT || 5000;
const otherstuff= "This is some other stuff I am excited about..."
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home', {
        stuff: otherstuff
});
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server listening on port' + PORT));