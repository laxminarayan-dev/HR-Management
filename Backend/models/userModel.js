const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    age: {
        type: Number
    },
    address: {
        type: String
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel