const express = require("express");
const route = express.Router()
const DeptModel = require("../models/Department");
const { EmpModel } = require("../models/EmpModel");

// 0. Show all Departmentsla tha 
route.get("/", async (req, res) => {
    try {
        const departments = await DeptModel.find()
        console.log(departments.length == 0);

        if (departments == null || departments.length == 0) {
            console.log("here");

            res.status(404).json({
                message: "no department found",
                departments: null
            })
        }
        else {
            res.status(202).json({
                message: "departments found",
                departments: departments
            })
        }
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: "Internal server error 11" });
    }
})

// 1. Add Department
route.post("/add", async (req, res) => {
    try {
        const department = new DeptModel(req.body);
        await department.save();
        const departments = await DeptModel.find()
        res.status(201).json({ message: "Department added successfully", departments });
    } catch (error) {
        res.status(400).json({ message: "Error adding department", error: error.message });
    }
});

// 2. Update Department
route.post("/update/:id", async (req, res) => {
    try {
        const department = await DeptModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // return updated document
        );

        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }
        // Extract the updated employee IDs from full employee objects in req.body.employees
        const newEmployeeIds = (req.body.employees || []).map(emp => emp._id);

        newEmployeeIds.push(department.head._id)

        // Update employees who are new members or still members, set their department field
        await EmpModel.updateMany(
            { _id: { $in: newEmployeeIds } },
            { $set: { department: { _id: department._id, name: department.name } } }
        );

        // Remove department from employees who are no longer members
        await EmpModel.updateMany(
            {
                "department._id": department._id,
                _id: { $nin: newEmployeeIds }
            },
            { $set: { department: null } }
        );

        res.json({ message: "Department updated successfully", department });
    } catch (error) {
        res.status(400).json({ message: "Error updating department", error: error.message });
    }
});

// 3. Get Department Details
route.get("/details/:id", async (req, res) => {
    try {
        const department = await DeptModel.findById(req.params.id)
            .populate("employees", "fullName email designation"); // populate employees

        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }

        res.json(department);
    } catch (error) {
        res.status(400).json({ message: "Error fetching department details", error: error.message });
    }
});

// 4. Delete Department
route.delete("/:id", async (req, res) => {
    const departmentId = req.params.id;
    try {

        const department = await DeptModel.findByIdAndDelete(req.params.id);

        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }

        await EmpModel.updateMany(
            { "department._id": departmentId }, // filter matching employees
            { $set: { department: null } }      // set department field to null
        );

        res.json({ message: "Department deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error deleting department", error: error.message });
    }
});

module.exports = route
