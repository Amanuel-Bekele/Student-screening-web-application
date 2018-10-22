var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    token: String,
    student: Object,
    createdOn:Date,
    createdBy:String,
    status: String 
});

module.exports = mongoose.model('ExamToken',schema);