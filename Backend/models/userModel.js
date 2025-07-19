const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    phone: {
        type: String
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

const userModel = mongoose.model("Users", userSchema, "usersInfo")

module.exports = userModel