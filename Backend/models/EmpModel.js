const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true    // avoid duplicate employee emails
    },
    bank: {
        name: { type: String },
        account: { type: String },
        IFSC: { type: String }
    },
    phone: {
        type: String
    },
    password: {
        type: String
    },
    dob: {
        type: Date
    },
    department: {
        _id: { type: mongoose.Schema.Types.ObjectId, },
        name: { type: String }
    },
    designation: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    hireDate: {
        type: Date,
        default: Date.now
    },
    bank: { name: { type: String, require }, ifsc: { type: String, require }, account: { type: Number, require } },
    salary: {
        basic: { type: Number, required: true },
        bonus: { type: Number, default: 0 },
        allowance: {
            houseRentAllowances: { type: Number, default: 7000 },
            conveyanceAllowances: { type: Number, default: 2000 },
            medicalAllowances: { type: Number, default: 5000 },
            specialAllowances: { type: Number, default: 0 },
        },
        currency: { type: String, default: "INR" },
        proccessed: {},
        due: {},
        lastProccessed: { type: Number, default: 0 },
        lastDue: { type: Number, default: 0 },
        lastProccessedMonth: { type: Date },

        deduction: {
            epf: { type: Number, default: 3000 },
            healthInsurance: { type: Number, default: 3000 },
            professionalInsurance: { type: Number, default: 2000 },
            tds: { type: Number, default: 5000 },
        }
    },
    leaves: {
        totalLeaves: {
            type: Number,
            default: 24
        },
        leavesTaken: {
            type: Number,
            default: 0
        },
        leavesRemaining: {
            type: Number,
        }
    },
    status: {
        type: String,
        enum: ["Active", "On Leave", "Resigned", "Terminated"],
        default: "Active"
    },
    address: {
        line1: { type: String },
        line2: { type: String },
        city: { type: String },
        state: { type: String },
        postalCode: { type: String },
        country: { type: String, default: "India" }
    }
});

const EmpModel = mongoose.model("Employee", employeeSchema, "employeesInfo");

module.exports = {
    EmpModel,
    employeeSchema,
};
