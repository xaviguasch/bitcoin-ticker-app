const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/', function (req, res) {
    res.sendFile(`${__dirname}/index.html`)
})

app.post('/', function (req, res) {
    const crypto = req.body.crypto
    const fiat = req.body.fiat

    const baseURL = 'https://apiv2.bitcoinaverage.com/indices/global/ticker'
    const finalURL = `${baseURL}/${crypto}${fiat}`

    request(`${finalURL}`, function (error, response, body) {
        const data = JSON.parse(body)
        const price = data.averages.week

        res.send(`<h1>The price of ${crypto} is ${price} ${fiat}.</h1>`)
    })
})


app.listen(3000, function () {
    console.log('Server is running on port 3000');
})