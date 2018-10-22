var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var random = require('mongoose-simple-random');


var questionSchema = new Schema({
    question: String,
    createdOn:Date,
    createdBy:String,
    status: String 
});
questionSchema.plugin(random);


module.exports = mongoose.model('Question',questionSchema);