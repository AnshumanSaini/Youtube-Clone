const jwt = require("jsonwebtoken");
const createError = require("./error");

const verifyToken = (req, res, next)=>{
    const token = req.cookies.access_token;
    if(!token) return res.status(404).json(createError(401, "You are not authenticated!"));

    jwt.verify(token, process.env.JWT, (err, user)=>{
        if(err) return res.status(403).json(createError(403, "Token is not valid!"));
        req.user = user; 
        next();
    })
    }

module.exports = verifyToken;