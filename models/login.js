var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var loginSchema = new Schema({
    userName:String,
    password:String
});

module.exports = mongoose.model('Login' , loginSchema);