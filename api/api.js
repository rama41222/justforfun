var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var mongoose = require('mongoose')
var bluebird = require('bluebird')
var User = require('./models/User')
var jwt = require('jwt-simple')
// var jwt = require('./services/jwt')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;


mongoose.Promise = bluebird


var app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(passport.initialize())
passport.serializeUser(function (user, done) {
  done(null, user.id)
})

var strategyOptions = {usernameField: 'email'}
var loginStrategy = new LocalStrategy(strategyOptions , function (email, password, done) {
  User.findOne({email: email}, function(err, user) {
    if (err) return done(err)

    if(!user)
      return done(null, false, {message: 'User does not exist'})

    user.comparePasswords(password, function (err, isMatch) {
      if (err) return done(err)

        if(!isMatch)
          return done(null, false,{message: 'Wrong email/password'})

      return done(null, user)
    })
  })
})

var registerStrategy = new LocalStrategy(strategyOptions ,function (email, password,done) {

  User.findOne({email: email}, function(err, user) {
    if (err) return done(err)

    if (user)
      return done(null, false, {message: 'User already exist'})


    var newUser = new User({
      email: email,
      password: password
    });

    newUser.save(function (err) {
      done(null, newUser)
    })
  })
})

passport.use('local-register',registerStrategy)
passport.use('local-login',loginStrategy)

app.post('/login', passport.authenticate('local-login'),function(req, res, next) {
  createSendToken(req.user, res)
})

app.post('/register',passport.authenticate('local-register'), function(req, res) {
    createSendToken(req.user, res)
})
//0 - artificial
//1 - natural

function createSendToken(user, res) {
  var payload  = {
    sub: user.id,
  }
  var token = jwt.encode(payload,'shhhh')
  res.status(200).send({user: user.toJSON(), token: token })


}

var cards = [
  {name:'card1', image:'image', price:10.23 , type:'0'},
  {name:'card1', image:'image', price:10.23 , type:'0'},
  {name:'card1', image:'image', price:10.23 , type:'0'},
  {name:'card1', image:'image', price:10.23 , type:'1'},
  {name:'card1', image:'image', price:10.23 , type:'1'},
  {name:'card1', image:'image', price:10.23 , type:'0'},
  {name:'card1', image:'image', price:10.23 , type:'1'},

]

var wrappers = [
  {name:'wrapper1', image:'image', price:1.23 , type:'0'},
  {name:'wrapper1', image:'image', price:2.23 , type:'0'},
  {name:'wrapper1', image:'image', price:3.23 , type:'0'},
  {name:'wrapper1', image:'image', price:1.23 , type:'1'},
  {name:'wrapper1', image:'image', price:0.23 , type:'1'},
  {name:'wrapper1', image:'image', price:1.23 , type:'0'},
  {name:'wrapper1', image:'image', price:0.23 , type:'1'},
]

var notes = [
  {title:'note1', text:'lorem ipsum dolor init', towhom:'Test Subject' , location:'no non o', deliverytime:'Fri Nov 03 2017 15:52:45 GMT+0530 (+0530)'},
  {title:'note1', text:'lorem ipsum dolor init', towhom:'Test Subject' , location:'no non o', deliverytime:'Fri Nov 03 2017 15:52:45 GMT+0530 (+0530)'},
  {title:'note1', text:'lorem ipsum dolor init', towhom:'Test Subject' , location:'no non o', deliverytime:'Fri Nov 03 2017 15:52:45 GMT+0530 (+0530)'},
  {title:'note1', text:'lorem ipsum dolor init', towhom:'Test Subject' , location:'no non o', deliverytime:'Fri Nov 03 2017 15:52:45 GMT+0530 (+0530)'},
  {title:'note1', text:'lorem ipsum dolor init', towhom:'Test Subject' , location:'no non o', deliverytime:'Fri Nov 03 2017 15:52:45 GMT+0530 (+0530)'},
  {title:'note1', text:'lorem ipsum dolor init', towhom:'Test Subject' , location:'no non o', deliverytime:'Fri Nov 03 2017 15:52:45 GMT+0530 (+0530)'},

]

var orders= [
  {cardid:'11111', wrapperid:'11111', towhom:'Test Subject' , location:'no non o', locatdeliverytimeion:'Fri Nov 03 2017 15:52:45 GMT+0530 (+0530)', totalprice: 200},
  {cardid:'22222', wrapperid:'22222', towhom:'Test Subject' , location:'no non o', locatdeliverytimeion:'Fri Nov 03 2017 15:52:45 GMT+0530 (+0530)', totalprice: 200},
  {cardid:'33333', wrapperid:'33333', towhom:'Test Subject' , location:'no non o', locatdeliverytimeion:'Fri Nov 03 2017 15:52:45 GMT+0530 (+0530)', totalprice: 200},
  {cardid:'44444', wrapperid:'44444', towhom:'Test Subject' , location:'no non o', locatdeliverytimeion:'Fri Nov 03 2017 15:52:45 GMT+0530 (+0530)', totalprice: 200},
  {cardid:'55555', wrapperid:'55555', towhom:'Test Subject' , location:'no non o', locatdeliverytimeion:'Fri Nov 03 2017 15:52:45 GMT+0530 (+0530)', totalprice: 200},
  {cardid:'66666', wrapperid:'66666', towhom:'Test Subject' , location:'no non o', locatdeliverytimeion:'Fri Nov 03 2017 15:52:45 GMT+0530 (+0530)', totalprice: 200},

]
app.get('/cards', function (req, res) {

  if(!req.headers.authorization) {
    return res.status(401).json({error:'You are not authorized'})
  }
console.log(req.headers.authorization)
  var token = req.headers.authorization.split(' ')[1]
  var payload = jwt.decode(token, 'shhhh')

  res.status(200).send(cards)
})



app.post('/auth/google', function (req, res) {
  console.log(req.body.code)
  res.status(204).send()
})


mongoose.connect('mongodb://localhost/cards', { useMongoClient: true})

var server  = app.listen(9090, function () {
  console.log('Api listening on '+ server.address().port)
})
