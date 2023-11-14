const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { NoteModel } = require("../models/NoteModel")
const { authenticator } = require("../middlewares/authenticator")
const noteRouter = express.Router()

noteRouter.use(authenticator);

noteRouter.get("/",async (req,resp)=>{
    let token = req.headers.authorization;
    jwt.verify(token,"sndifbd2347938",async(err,decode)=>{
        try {
            let data = await NoteModel.find({user:decode.userId})
            resp.send({
                data:data,
                message:"Success",
                status:1
            })
        } catch (error) {
            resp.send({
                message:error.message,
                status:0
            })
        }
    })
})

noteRouter.post("/create",async (req,resp)=>{
    try {
        let note = new NoteModel(req.body)
        await note.save()
        resp.send({
            message:"Note Created Successfully!!!",
            status:1
        })
    } catch (error) {
        resp.send({
            message:error.message,
            status:0
        })
    }
})

noteRouter.patch("/",async (req,resp)=>{
    let {id} = req.headers
    try {
        await NoteModel.findByIdAndUpdate({_id:id},req.body)
        resp.send({
            message:"Note Updated!!!",
            status:1
        })
    } catch (error) {
        resp.send({
            message:error.message,
            status:0
        })
    }
})

noteRouter.delete("/",async (req,resp)=>{
    let {id} = req.headers
    try {
        await NoteModel.findByIdAndDelete({_id:id})
        resp.send({
            message:"Note Deleted!!!",
            status:1
        })
    } catch (error) {
        resp.send({
            message:error.message,
            status:0
        })
    }
})

module.exports = {
    noteRouter
}