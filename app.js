const express = require('express')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const app = express()
var http = require('http').Server(app);
var firebase = require("firebase");
var io = require('socket.io')(http);
const axios = require('axios')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static(__dirname + '/public'))

var fireconfig = {
  apiKey: " AIzaSyC9OJO4HawfUpRXl1HKVKRRESKbicoe13I ",
  authDomain: "databreaker-92ee6.firebaseapp.com",
  projectId: "databreaker-92ee6",
  databaseURL: "https://databreaker-92ee6.firebaseio.com",
  storageBucket: "databreaker-92ee6.appspot.com "
};
firebase.initializeApp(fireconfig);


http.listen(3000, function(){
  console.log('listening on *:3000');
});


app.get('/', (req, res) => {
  res.render('pages/home')
})

app.post('/signup', (req, res) => {
  console.log(req.body.email)
    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
    .then(user =>{
      console.log(user.uid)
         res.redirect("/game");
    })
    .catch(error=>{
      res.send(error)
    })

})

app.get('/game/', (req, res) => {
  res.render('pages/game')
})

io.on('connection', function(socket){
  socket.on('score', function(score){
    console.log('score: ' + score);
    firebase.auth().onAuthStateChanged(user => {
      firebase.firestore().collection('user').doc(user.uid).update({
        score:score
      })
    });

  });
});
