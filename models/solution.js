var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    studentId: String,
    answer: [{
        question: {
            _id: String,
            question: String, 
        },
        solution: String
    }],
    status: String 
});

//submitted student solutions to questions
module.exports = mongoose.model('Solution',schema);