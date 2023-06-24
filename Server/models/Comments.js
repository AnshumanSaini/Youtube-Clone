const mongoose = require("mongoose");

const CmtSchema =new mongoose.Schema({
    userId: {
        type: String,
        requried: true
    },
    videoId:{
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
},{timestamps: true}
);

module.exports = mongoose.model("Comment", CmtSchema);