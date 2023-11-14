const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../models/UserModel")
const { NoteModel } = require("../models/NoteModel")
const userRouter = express.Router()

userRouter.get("/",(req,resp)=>{
    resp.send("All the user")
})

userRouter.post("/register",async (req,resp)=>{
    const {name,email,password} = req.body;
    bcrypt.hash(password,10,async function(err,hash){
        if(err)
        {
            return resp.send({message:"Something Went Wrong.",status:0})
        }
        try {
            let user = new UserModel({name,email,password:hash})
            await user.save()
            resp.send({
                message:"User Created",
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

userRouter.post("/login",async (req,resp)=>{
    const {email,password} = req.body;
    try {
        let existingUser = await UserModel.findOne({email});
        if(!existingUser)
        {
            resp.send({
                message:"User does not exist!!!",
                status:0
            })
            return;
        }
        let token = jwt.sign({userId:existingUser._id},"sndifbd2347938",{expiresIn:'1h'});
        bcrypt.compare(password,existingUser.password,function(err,result){
            if(err)
            {
                return resp.send({
                    message:"Something went wrong:"+err,
                    status:0
                })
            }
            if(result)
            {
                resp.send({
                    message:"User logged in successfully!!!",
                    token:token,
                    status:1
                });
            }
            else{
                resp.send({
                    message:"Incorrect Password",
                    status:0
                });
            }
        })
    } catch (error) {
        resp.send({
            message:error.message,
            status:0
        })
    }
})

module.exports={userRouter}