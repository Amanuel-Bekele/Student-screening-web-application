var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    question: String,
    createdOn:Date,
    createdBy:String,
    status: String 
});

module.exports = mongoose.model('Question',questionSchema);