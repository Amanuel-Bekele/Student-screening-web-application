var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
    firstName: String,
    lastName: String,
    email:String,
    Address:{
        street:String,
        city:String,
        state:String,
        country: String,
        zip:Number
    }

});

module.exports =  mongoose.model('Student',studentSchema);