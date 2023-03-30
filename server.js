const express = require('express');
const cors = require('cors');
const body_parser = require('body-parser');

// const client_id = process.env.CLIENT_ID;
// const client_secret = process.env.CLIENT_SECRET;

const client_id = "56101bc6f878daff5d1e";
const client_secret = "57bee343d8fede6a3969c03ec087d730c1bd59f5";


let app = express();
app.use(cors());
app.use(body_parser.json());

app.get('/api', function(req, res) {
  res.send('link ok');
});



app.listen(5000, function(){
  console.log('server running on http://localhost:5000')
});