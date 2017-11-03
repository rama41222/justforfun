var mongoose = require('mongoose')
var bluebird = require('bluebird')
var bcrypt = require('bcrypt-nodejs')
mongoose.Promise = bluebird

var UserSchema = mongoose.Schema({
  email :String,
  password: String,
})

UserSchema.pre('save',function (next) {
  var user = this
  console.log('dddddddd')
  console.log(user)
  if(!user.isModified('password')) return next()

  bcrypt.genSalt(1, function (err, salt) {
    if(err) return next(err)

    bcrypt.hash(user.password, salt, null, function (err, hash) {
       if(err) return next(err)
       user.password = hash
      next()
    })
  })
})

UserSchema.methods.toJSON = function () {
  var user = this.toObject()
  delete user.password
  return user
}

exports.model = mongoose.model('User',UserSchema);
