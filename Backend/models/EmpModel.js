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
    phone: {
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
