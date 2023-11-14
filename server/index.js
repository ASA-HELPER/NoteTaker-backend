const express = require("express");
const cors = require("cors");
const {conn} = require("./db");
const dotenv = require("dotenv");
const { userRouter } = require("./routes/user.routes");
const { noteRouter } = require("./routes/note.routes");
dotenv.config()
const port = process.env.PORT;
const app = express();

app.use(cors())
app.use(express.json())
app.use("/user",userRouter)
app.use("/note",noteRouter)

app.get("/",(req,resp)=>{
    resp.send({
        message:"Api is working Fine"
    })
})

app.listen(port,async()=>{
    try {
        await conn;
        console.log("Database is connected");
    } catch (error) {
        console.log(error)
    }
    console.log(`Server is running at port ${port}`);
})