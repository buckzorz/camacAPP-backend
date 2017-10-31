var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    name:{
        type: String,
        required: false
    },
    phone:{
        type: String,
        required: false
    },
    email:{
        type: String,
        required: false
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);