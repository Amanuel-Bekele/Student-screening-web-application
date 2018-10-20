var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    email:String,
    Address:{
        street:String,
        city:String,
        state:String,
        country: String,
        zip:Number
    },
    userName:String,
    password:String,
    role:String,
    status:String 
});

module.exports = mongoose.model('User',userSchema);