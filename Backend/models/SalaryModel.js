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
        basic: { type: Number, required: true },
        bonus: { type: Number, default: 0 },
        currency: { type: String, default: "INR" },
        proccessed: { type: Number, default: 0 },
        bonusProccessed: { type: Number, default: 0 },
        due: { type: Number, default: 0 },
        lastDue: { type: Number, default: 0 },
        lastProccessed: { type: Number, default: 0 },
        netPay: { type: Number, default: 0 },
        lastProccessedMonth: { type: Date },
        allowance: {
            houseRentAllowances: { type: Number, default: 7000 },
            conveyanceAllowances: { type: Number, default: 2000 },
            medicalAllowances: { type: Number, default: 5000 },
            specialAllowances: { type: Number, default: 0 },
        },

        deduction: {
            epf: { type: Number, default: 3000 },
            healthInsurance: { type: Number, default: 3000 },
            professionalInsurance: { type: Number, default: 2000 },
            tds: { type: Number, default: 5000 },
        }
    },
    bank: { name: { type: String, require }, ifsc: { type: String, require }, account: { type: Number, require } },
});

const SalaryModel = mongoose.model("Salary", salarySchema, "salaryInfo");

module.exports = SalaryModel
