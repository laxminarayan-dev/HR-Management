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
route.post("/addEmp", async (req, res) => {

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
module.exports = route
