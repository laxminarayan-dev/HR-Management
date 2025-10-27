const express = require("express");
const route = express.Router()
const userModel = require("../models/userModel")

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
route.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await userModel.findOne({ email: email })
        if (user === null) {
            try {
                const user = new userModel({
                    id: generateUserId(),
                    name: name,
                    password: password,
                    email: email,
                })
                await user.save()
                res.status(200).send({
                    message: "User Data saved successfully"
                })
            } catch (error) {
                res.status(500).send({
                    message: "Failed to save User Data "
                })
            }
        } else {
            res.status(401).send({
                "message": "user already created"
            })
        }

    } catch (error) {
        res.status(500).send({
            "message": "Internal Server Error"
        })
    }

})
module.exports = route
