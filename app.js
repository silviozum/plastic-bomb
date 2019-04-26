const express = require('express')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = process.env.PORT || 5000
const firebase = require('firebase')

app.set('view engine', 'ejs')     // Setamos que nossa engine será o ejs
app.use(expressLayouts)           // Definimos que vamos utilizar o express-ejs-layouts na nossa aplicação
app.use(bodyParser.urlencoded())  // Com essa configuração, vamos conseguir parsear o corpo das requisições

app.use(express.static(__dirname + '/public'))
app.listen(port, () => {
    console.log(`subiu pai - http://localhost:${port}`)
})

app.get('/', (req, res) => {
  res.render('pages/home')
})


app.get('/game', (req, res) => {
  res.render('pages/game')
})


var config = {
  apiKey: "<API_KEY>",
  authDomain: "<PROJECT_ID>.firebaseapp.com",
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
  storageBucket: "<BUCKET>.appspot.com",
};

firebase.initializeApp(config);

app.post('/signup', (req, res) => {
    console.log(req.body)
    res.send(req.body)
})
