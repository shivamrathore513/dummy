const express = require('express');
const request = require('request');
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/proxy', (req, res) => {
    const url = req.query.url;
    console.log("url",url);
    if (!url) {
        return res.status(400).send('URL is required');
    }
    request({ url, encoding: null }, (error, response, body) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        res.set('Content-Type', response.headers['content-type']);
        res.send(body);
        // res.json({ message: 'Success' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
