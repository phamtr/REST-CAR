const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    cars: [{
        type:  Schema.Types.ObjectId,
        ref: 'car'
    }]
   
});

module.exports = mongoose.model('User', userSchema);