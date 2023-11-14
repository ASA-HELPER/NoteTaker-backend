const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

function authenticator(req,resp,next){
    const token = req.headers.authorization;
    jwt.verify(token,"sndifbd2347938",(err,decode)=>{
        if(err)
        {
            return resp.send({
                message:"Token is not valid please login",
                status:2
            })
        }
        if(decode)
        {
            req.body.user = decode.userId;
            next()
        }
        else
        {
            resp.send({
                message:"Token is not valid please login",
                status:2
            })
        }
    })
}

module.exports={
    authenticator
}