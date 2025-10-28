const express = require("express");
const route = express.Router()
const SalaryModel = require("../models/SalaryModel");

route.get("/", async (req, res) => {
    try {
        const salaryEntries = await SalaryModel.find()

        if (salaryEntries == null || salaryEntries.length === 0) {
            res.status(404).json({
                "message": "no Salary Entry found!"
            })
        }
        else {
            res.status(200).json({
                "message": "Salary Entries found.",
                salaryEntries
            })
        }

    } catch (error) {
        console.error("Salary Entry load error:", error);
        res.status(500).json({ message: "Internal server error" });
    }


})
route.get("/detail/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const salaryEntry = await SalaryModel.findOne({ _id: id });
        if (!salaryEntry) {
            return res.status(404).json({ message: "no Salary Entry found" });
        }
        return res.status(200).json({ message: "Salary Entry found", salaryEntry });
    } catch (error) {
        console.error("Salary Entry load error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
route.post("/add", async (req, res) => {
    try {
        const salaryEntry = new SalaryModel(req.body)
        await salaryEntry.save()
        const salaryEntries = await SalaryModel.find()
        res.status(200).send({
            message: "Entry added Successfully.",
            salaryEntries
        })
    } catch (error) {
        res.status(500).send({
            message: "Failed to add Entry!"
        })
    }

})
route.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const salaryEntry = await SalaryModel.findById(id);
        if (!salaryEntry) {
            return res.status(404).json({
                message: "No Salary Entry Found!"
            });
        }


        // Delete the Salary Entry
        const deletedEntry = await SalaryModel.findByIdAndDelete(id);
        if (!deletedEntry) {
            return res.status(400).json({
                message: "Salary Entry Deletion Unsuccessful!"
            });
        }

        const remainingEntry = await SalaryModel.find()

        res.status(200).json({
            message: "Salary Entry Deletion Successful!",
            remainingEntry
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error!"
        });
    }
})
module.exports = route
