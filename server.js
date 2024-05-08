const express = require('express');
const path = require('path');
require('dotenv').config()

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use(express.static('client/build'));

app.get('/api/edt', (_, res) => {
    res.send({
        msg: "Request received 2."
    })
})

app.get('/*', (_, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

app.listen(PORT, () => {
    console.log(`Le serveur est lancé sur le port: ${PORT}`);
})