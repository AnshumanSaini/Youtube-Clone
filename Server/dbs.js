const mongoose = require("mongoose")
require("dotenv").config();

const connectToMongo = ()=>{
    mongoose.connect(process.env.mongo, {useNewUrlParser: true}).then(()=> console.log("Connection is Successfull...")).catch((err)=> console.log(err));
}

module.exports = connectToMongo;