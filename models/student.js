var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
    firstName: string,
    lastName: string,
    email:string,
    Address:{
        street:string,
        city:string,
        state:string,
        country: string,
        zip:number
    },
    applicationCode:string,
    
});

mongoose.model('student',studentSchema);