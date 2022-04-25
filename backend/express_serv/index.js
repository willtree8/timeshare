const express = require('express');
const app = express();
const axios = require('axios');
require('dotenv').config({ path: '../config.env' });

clientID = process.env.clientID;
clientSecret = process.env.ClientSecret;
//console.log('a' + clientID)

// init express
app.set('view engine', 'pug');
var access_token = "";
app.get('/', function(req, res) {
    res.render('pages/index',{client_id: clientID});
});

const port = 2400;
app.listen(port, () => console.log('listening on ' + port));

//github oauth
//get callback data
app.getMaxListeners('/github/callback', (req,res) => {
    const requestToken = req.query.code

    axios({
        method: 'post',
        url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,

        headers: {
            accept: 'application/json'
        }
    }).then((response) => {
        access_token = response.data.access_token
        res.redirect('/success')
    })
})

//get access token from success
app.get('/success', function(req, res) {

    axios ({
        method: 'get',
        url: `https://api.github.com/user`,
        headers: {
            Authorization: 'token ' + access_token
        }
    }).then((response) => {
        res.render('pages/success',{ userData: response.data });
    })
});