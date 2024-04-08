const mongo = require('mongoose');
const userSchema = new mongo.Schema({
    username : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },   
    email : {
        type : String,
        required : true,
    },
    isadmin: {
        type : Boolean,
        required : true
    },


});

module.exports = mongo.model("users", userSchema)