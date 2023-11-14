const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config()

const conn = mongoose.connect(process.env.mongodbURL);

module.exports={
    conn,
}