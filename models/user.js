var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    email:{ type: String, unique: true },
    Address:{
        street:String,
        city:String,
        state:String,
        country: String,
        zip:Number
    },
    userName:{ type: String, unique: true },
    password:String,
    role:String,
    status:String 
});

module.exports = mongoose.model('User',userSchema);