const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Users = new Schema({
    Name : {
        type : String,
        minlength : 3,
        required : true
    },
    Age : {
        type : Number,
        required : true,
        minlength : 3
    },
    Email : {
        type : String,
        required:true,
        unique : [true , "Email-id already present"]
    },
    Mobile : {
        type : String,
        required : true,
        min : 10,
        max : 10
    },
    Gender : String
})

module.exports = (mongoose.model('Users' , Users));