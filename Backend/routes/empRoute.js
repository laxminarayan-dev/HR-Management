const express = require("express");
const route = express.Router()
const EmpModel = require("../models/EmpModel")

route.get("/allEmployees", async (req, res) => {
    try {
        const emps = await EmpModel.find()

        if (emps == null || emps.length === 0) {
            res.status(404).json({
                "message": "no emp found"
            })
        }
        else {
            res.status(202).json({
                "message": "emps found",
                "emps": emps
            })
        }

    } catch (error) {
        console.error("Emp load error:", error);
        res.status(500).json({ message: "Internal server error" });
    }


})

route.get("/detail/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const emp = await EmpModel.findOne({ _id: id });
        if (!emp) {
            return res.status(404).json({ message: "no emp found" });
        }
        return res.status(200).json({ message: "emp found", emp });
    } catch (error) {
        console.error("Emp load error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

route.post("/add", async (req, res) => {

    const { fullName, email, phone, dob, department, designation, hireDate, salary, leaves, status, address } = req.body;
    try {
        const emp = await EmpModel.findOne({ email: email })

        if (emp === null) {
            try {
                const emp = new EmpModel({
                    fullName: fullName,
                    email: email,
                    phone: phone,
                    dob: dob,
                    department: department,
                    designation: designation,
                    hireDate: hireDate,
                    salary: {
                        basic: salary.basic,
                        bonus: salary.bonus,
                    },
                    leaves: {
                        totalLeaves: leaves.totalLeaves,
                        leavesTaken: leaves.leavesTaken,
                        leavesRemaining: leaves.leavesRemaining,
                    },
                    status: status,
                    address: {
                        line1: address.line1,
                        line2: address.line2,
                        city: address.city,
                        state: address.state,
                        postalCode: address.postalCode,
                        country: address.country,
                    },
                })
                console.log(emp);

                await emp.save()
                const emps = await EmpModel.find()
                res.status(200).send({
                    emps: emps,
                    message: "Emp Data saved successfully"
                })
            } catch (error) {
                res.status(500).send({
                    err: error,
                    message: "Failed to save Emp Data "
                })
            }
        } else {
            res.status(401).send({
                "message": "Emp already created"
            })
        }

    } catch (error) {
        res.status(500).send({
            "message": "Internal Server Error"
        })
    }

})

route.post("/update/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const emp = await EmpModel.findById(id);
        if (!emp) {
            return res.status(404).json({ message: "No Employee Found!" });
        }

        // Update the employee document with new data from req.body
        await EmpModel.findByIdAndUpdate(id, req.body, { new: true });

        // Fetch updated employee details to return
        const updatedEmp = await EmpModel.findById(id);

        res.status(200).json({
            emp: updatedEmp,
            message: "Employee data updated successfully",
        });
    } catch (error) {
        console.error("Failed to update employee data: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

route.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const emp = await EmpModel.findById(id);
        if (!emp) {
            return res.status(404).json({
                message: "No Employee Found!"
            });
        }
        // Delete the employee
        await EmpModel.findByIdAndDelete(id);

        res.status(200).json({
            message: "Employee deleted successfully",
        });
    } catch (error) {
        console.error("Failed to delete employee data: ", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
})


module.exports = route
