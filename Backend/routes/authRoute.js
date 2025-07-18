const express = require("express");
const route = express.Router()
const userModel = require("../models/userModel")

route.get("/login", async (req, res) => {
    try {
        const user = new userModel({
            id: "USR1011",
            name: "Lucky Jaiswal",
            phone: "8864821311",
            email: "jaiswallucky@gamil.com",
        })
        await user.save()
        res.status(201).send({
            message: "User Data saved successfully"
        })
    } catch (error) {
        res.status(500).send({
            message: "Failed to save User Data "
        })
    }
})

module.exports = route