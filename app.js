let express = require('express');
var path = require('path');
let app = express();
let multer  = require('multer');
let index = require('./routes/index');
let bodyParser = require('body-parser');
let config = require('config');
let db = require('./models/index.js');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static('public'));
app.use(express.static('client'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(multer({ dest: './uploads/'}).single('file'));

app.use('/', index);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});