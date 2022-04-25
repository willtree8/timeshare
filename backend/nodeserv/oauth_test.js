const axios = require('axios');
const app = require('../../platforms/android/app/build/intermediates/merged_assets/debug/out/www/cordova-js-src/plugin/android/app');
require('dotenv').config({ path: './config.env' });
clientID = process.env.clientID
clientSecret = process.env.ClientSecret

app.get('/github/callback', (req, res) =>{
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