const mongoose = require("mongoose");
const { employeeSchema } = require('./EmpModel')

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true // each department should be unique
    },
    description: {
        type: String
    },
    head: employeeSchema,
    employees: [
        employeeSchema
    ],
    budget: {
        allocated: { type: Number, default: 0 }, // yearly budget
        spent: { type: Number, default: 0 },     // money used
        currency: { type: String, default: "INR" }
    },
    location: {
        office: { type: String },     // e.g., "Building A, 2nd Floor"
        city: { type: String },
        state: { type: String },
        country: { type: String, default: "India" }
    },
    projects: [
        {
            name: { type: String },
            description: { type: String },
            startDate: { type: Date },
            endDate: { type: Date },
            status: {
                type: String,
                enum: ["Planned", "Ongoing", "Completed", "On Hold"],
                default: "Planned"
            }
        }
    ],
    goals: [
        {
            title: { type: String },  // e.g., "Increase Sales by 20%"
            deadline: { type: Date },
            achieved: { type: Boolean, default: false }
        }
    ],
    policies: [
        {
            title: { type: String },  // e.g., "Work from Home Policy"
            description: { type: String },
            effectiveFrom: { type: Date }
        }
    ],
    performance: {
        rating: {
            type: Number, // 1 to 5 rating system
            min: 1,
            max: 5,
            default: 3
        },
        kpis: [
            {
                name: { type: String },       // e.g., "Project Delivery"
                score: { type: Number, default: 0 }, // percentage or points
                target: { type: Number }
            }
        ],
        lastReviewed: {
            type: Date,
            default: Date.now
        }
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    }
});

const DeptModel = mongoose.model("Department", departmentSchema, "departmentsInfo");

module.exports = DeptModel;
