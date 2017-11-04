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
var request = require('request')
var facebookAuth = require('./services/facebookAuth')
var createSendToken = require('./services/jwt')
var config = require('./services/config')


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

var cards = [
  {id:'1', name:'Naturalist', image:'http://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2010/9/7/9/RX-DK-AGX12004_natural-card_s3x4.jpg.rend.hgtvcom.1280.1707.suffix/1400956956111.jpeg', price:10.23 , type:'0'},
  {id:'2', name:'Wonders', image:'http://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2010/9/7/9/RX-DK-AGX12101_completed-card_s3x4.jpg.rend.hgtvcom.1280.1707.suffix/1400956850313.jpeg', price:10.23 , type:'0'},
  {id:'3', name:'Lorem Series', image:'http://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2010/9/7/8/RX-DK-AGX12003_leaf-cover_s3x4.jpg.rend.hgtvcom.1280.1707.suffix/1400956635381.jpeg', price:10.23 , type:'0'},
  {id:'4', name:'Wind', image:'https://i.pinimg.com/originals/c2/f5/75/c2f575e448241d63ecfa13abcb3db326.jpg', price:10.23 , type:'1'},
  {id:'5', name:'Supernova', image:'https://i.pinimg.com/736x/3c/33/b2/3c33b2dffb4af5a2b8bfee50e7037465--artist-card-paper-cards.jpg', price:10.23 , type:'1'},
  {id:'6', name:'Sparks', image:'https://i.pinimg.com/736x/0a/e1/a4/0ae1a499b666186ce87439209577a4cd.jpg', price:10.23 , type:'0'},
  {id:'7', name:'Wrgiht', image:'https://render.fineartamerica.com/images/rendered/medium/greeting-card/images-medium-5/together-veikko-suikkanen.jpg?&targetx=0&targety=-25&imagewidth=500&imageheight=751&modelwidth=500&modelheight=700&backgroundcolor=877435&orientation=1', price:10.23 , type:'1'},

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
  var url =  'https://www.googleapis.com/oauth2/v4/token'
  var apiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect'
  var params = {
    client_id: req.body.clientId,
    redirect_uri: req.body.redirectUri,
    code: req.body.code,
    grant_type: 'authorization_code',
    client_secret: config.GOOGLE_SECRET
  }
  request.post(url, {json: true,form: params}, function (err, response, token) {
      var accessToken = token.access_token
    var headers = {
      Authorization: 'Bearer ' + accessToken
    }

    request.get({url: apiUrl, headers: headers, json: true}, function (err, response, profile) {
      console.log(profile)
      User.findOne({googleId: profile.sub}, function (err, foundUser) {
          if(foundUser){
            return createSendToken(foundUser, res)
          }

          var newUser = new User();
          newUser.googleId = profile.sub
          newUser.displayName = profile.name
          newUser.save(function (err) {

            if(err){
              return next(err)
            }
            createSendToken(newUser, res)

          })

      })
    })

  })
})

app.post('/auth/facebook', facebookAuth)

mongoose.connect('mongodb://localhost/cards', { useMongoClient: true})

var server  = app.listen(9090, function () {
  console.log('Api listening on '+ server.address().port)
})
