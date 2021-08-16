const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    phone: String,
    email: String
})

module.exports = mongoose.model("User", userSchema);