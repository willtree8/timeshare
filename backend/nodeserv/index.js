const express = require('express');
const app = express();
const axios = require('axios');
const port = 3000;
app.listenerCount(port, () => console.log('server listening: ' + port));

axios({
    method: 'post',
    url: `127.0.0.1:2400`,
    headers: {
        accept: 'application/json'
    }
}).then((response) => {
    response = response.data
    res.redirect('/personals')
})