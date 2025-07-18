const express = require("express");
const route = express.Router()
const authRoute = require("./authRoute")
const userModel = require("../models/userModel")

route.get("/api", async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(201).send(users)
    } catch (error) {
        res.status(500).send({
            message: "Failed to save User Data "
        })
    }
})

route.use("/api/auth", authRoute)
route.use((req, res) => {
    res.status(404).send(`
        <div style=" height:95vh; display:flex; justify-content:center; align-items:center;">
        <h1>Page Not Found</h1>
        </div>
        `)
})
module.exports = route