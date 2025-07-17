const express = require("express");
const route = express.Router()
const authRoute = require("./authRoute")

route.get("/api", (req, res) => {
    res.send("home route")
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