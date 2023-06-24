const mongoose = require("mongoose");
const User = require("../models/User")
const bcrypt = require("bcrypt");
const createError = require("../error");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res)=>{
    try
    {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({...req.body, password: hash});

        const result = await newUser.save();
        res.status(200).json(result);
    }
    catch(err)
    {
        res.status(404).json(createError(404, "Not Found Sorry!"));
    }
}

const signin = async (req, res) =>{
    try
    {
        const user = await User.findOne({name: req.body.name});
        if(!user) return res.status(404).json(createError(404, "Not Found Sorry!"));
        
        const hash = user.password;
        const result = bcrypt.compareSync(req.body.password, hash);
        if(!result) return res.status(404).json(createError(404, "Wrong Credentials!"));

        const token = jwt.sign({id: user._id}, process.env.jwt);
        const {password, ...others} = user._doc;
        
        res.cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
    }
    catch(err)
    {
        console.log(err);
        return res.status(404).json(createError(404, "Not Found Sorry!"));
    }
}

module.exports = {signup, signin};