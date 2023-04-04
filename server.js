const express = require('express');
const axios = require('axios');
const fetch = (...args) =>
  import('node-fetch').then(({default: fetch}) => fetch(...args));
const cors = require('cors');
const body_parser = require('body-parser');
const { response } = require('express');

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


// Get user access_token - (取得access token)
app.get('/getAccessToken', async function (req, res) {
  try {
    const params = `client_id=${client_id}&client_secret=${client_secret}&code=${req.query.code}`;
    await fetch(`https://github.com/login/oauth/access_token?${params}`,{
      method: 'POST',
      headers: {
        "Accept": "application/json"
      }
    }).then((response) => {
      return response.json();
    }).then((data)=>{
      // console.log(data)
      res.json(data);
    })
  } catch (error) {
    console.log(error)
  }
});


// Get user data - (取得使用者資料)
app.get('/getUserData', async function (req, res) {
  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      "Authorization": req.get("Authorization")
    }
  }).then(response => {
    return response.json();
  }).then(data => {
    // console.log(data);
    res.json(data);
  }); 
});


// Get all issue list - (取得所有issues清單)
app.get('/getIssueList', async function (req, res) {
  const params = req.query.q
  console.log(params)
  await fetch(`https://api.github.com/search/issues?q=${params}`, {
    method: "GET",
    headers: {
      "Authorization": req.get("Authorization")
    },

  }).then(response => {
    return response.json();
  }).then(data => {
    // console.log(data);
    res.json(data);
  }); 
});

// Get single issue - (取得單一則issue資料)

// Create issue - (建立issue)

// Edit issue - (編輯issue)

// Close issue - (刪除issue)


// Server 監聽
app.listen(5000, function(){
  console.log('server running on http://localhost:5000')
});