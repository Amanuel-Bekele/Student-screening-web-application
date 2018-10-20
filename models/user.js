var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
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
    userName:string,
    password:string,
    role:string,
    status:string 
});

mongoose.model('user',userSchema);