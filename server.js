// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const multer = require('multer');
const upload = multer({
  dest: 'uploads/'
});


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({
  optionSuccessStatus: 200
})); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({
    greeting: 'hello API'
  });
});

app.get("/api/whoami", (request, response) => {
  const ipaddress = request.ip;
  const language = request.headers['accept-language'];
  const software = request.get('User-Agent');

  response.send({
    ipaddress,
    language,
    software
  });
});

app.post('/upload', upload.single('upfile'), (request, response) => {
  response.json({
    type: request.file.mimetype,
    name: request.file.originalname,
    size: request.file.size
  });
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});