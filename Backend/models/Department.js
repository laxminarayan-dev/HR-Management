const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    deptId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    head: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"   // Reference to Employee schema
    },
    employees: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee"  // Array of employees belonging to this department
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    }
}, {
    timestamps: true
});

const DepartmentModel = mongoose.model("Department", departmentSchema, "departmentsInfo");

module.exports = DepartmentModel;
