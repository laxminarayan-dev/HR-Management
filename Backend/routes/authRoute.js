const express = require("express");
const route = express.Router()
const userModel = require("../models/userModel")

function generateUserId() {
    const prefix = "USR";
    const timestamp = Date.now().toString(36);
    const randomPart = timestamp.slice(-5).toUpperCase();
    return prefix + randomPart;
}


route.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email: email })
        console.log("user:", user);

        if (user == null || user.length === 0) {
            res.status(404).json({
                "message": "no user found"
            })
        }
        else {
            if (password == user.password) {
                res.status(200).json({
                    "message": "login successfull"
                })
            } else {
                res.status(401).json({
                    "message": "password not match"
                })
            }
        }

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }


})
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
