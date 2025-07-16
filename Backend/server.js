const express = require("express")
const app = express();
const PORT = 8000 || process.env.PORT
const cors = require("cors")
const http = require("http")
app.use(cors())

app.get("/api/",(req,res)=>{
    res.status(200).send(http.STATUS_CODES)
})


app.listen(PORT,()=>{
    console.log(`
==============================
server running on port ${PORT}
==============================
        `);
})
