const mongoose = require("mongoose")

const { employeeSchema } = require('./EmpModel')
const userSchema = employeeSchema

const userModel = mongoose.model("Users", userSchema, "usersInfo")

module.exports = userModel