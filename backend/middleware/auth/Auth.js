const jwt = require("jsonwebtoken");
const User = require("../../model/User/User.js");
const asyncHandler = require("express-async-handler");

const userAuth = asyncHandler(async(req,res,next)=>{
    //check and get cookie/token
    const token = req?.headers?.cookie.slice(6) || req?.header("token") || req?.cookie.token;

    try {

        if(!token){
            return res.status(401).json({
                message: "No entry without authorization",
            })
        }

        const user = jwt.verify(token, process.env.API_JWT_SECRET_KEY);

        const userFound = await User.findById(user.id).select("-password");

        req.user = userFound;

        //Log user to see if it is working
        //console.log(userFound);

    } catch (error) {
        return res.json({message: "Error at Authentication",error})
    }

    next();
})

module.exports = userAuth;