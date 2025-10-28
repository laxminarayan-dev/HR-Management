const express = require("express");
const route = express.Router()
const userModel = require("../models/userModel");
const { EmpModel } = require("../models/EmpModel");

route.get("/allusers", async (req, res) => {
    try {
        const users = await userModel.find()

        if (users == null || users.length === 0) {
            res.status(404).json({
                "message": "no user found"
            })
        }
        else {
            res.status(202).json({
                "message": "users found",
                "users": users
            })
        }

    } catch (error) {
        console.error("User load error:", error);
        res.status(500).json({ message: "Internal server error" });
    }


})
route.get("/detail/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userModel.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({ message: "no user found" });
        }
        return res.status(200).json({ message: "user found", user });
    } catch (error) {
        console.error("User load error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
route.post("/add", async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body._id })
        if (user === null) {
            try {
                const user = new userModel({ ...req.body, isAdmin: true })
                await user.save()
                await EmpModel.findByIdAndUpdate(user._id, { isAdmin: true })
                const users = await userModel.find()
                res.status(200).send({
                    message: "Admin added Successfully.",
                    users
                })
            } catch (error) {
                res.status(500).send({
                    message: "Failed to add Admin!"
                })
            }
        } else {
            res.status(401).send({
                "message": "Admin already exist"
            })
        }

    } catch (error) {
        res.status(500).send({
            "message": "Internal Server Error"
        })
    }

})

route.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userModel.findById(id);
        await EmpModel.findByIdAndUpdate(id, { isAdmin: false })
        if (!user) {
            return res.status(404).json({
                message: "No User Found!"
            });
        }

        if (user && user.email == "root@hrf.com") {
            return res.status(403).json({
                message: "Deletion not allowed!"
            });
        }

        // Delete the user
        const deletedUser = await userModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(400).json({
                message: "User Deletion Unsuccessful!"
            });
        }

        const remainingUser = await userModel.find()

        res.status(200).json({
            message: "User Deletion Successful!",
            remainingUser
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error!"
        });
    }
})
module.exports = route
