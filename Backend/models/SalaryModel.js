const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String
    },
    department: {
        _id: { type: mongoose.Schema.Types.ObjectId, },
        name: { type: String }
    },
    designation: {
        type: String
    },
    hireDate: {
        type: Date,
        default: Date.now
    },
    salary: {
        basic: {
            type: Number,
            required: true
        },
        bonus: {
            type: Number,
            default: 0
        },
        currency: {
            type: String,
            default: "INR"
        },
        proccessed: { type: Number, default: 0 },
        bonusProccessed: { type: Number, default: 0 },
        due: { type: Number, default: 0 },
        lastProccessedMonth: { type: Date }
    },
});

const SalaryModel = mongoose.model("Salary", salarySchema, "salaryInfo");

module.exports = SalaryModel
