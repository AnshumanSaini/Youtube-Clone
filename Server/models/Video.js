const mongoose = require("mongoose");

const VideoSchema =new mongoose.Schema({
    userId: {
        type: String,
        requried: true
    },
    title: {
        type: String,
        requried: true
    },
    desc: {
        type: String,
        requried: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        requuired: true
    },
    views: {
        type: Number,
        default: 0,
    },
    tags: {
        type: [String],
        default: []
    },
    likes: {
        type: [String],
        default: []
    },
    dislikes: {
        type: [String],
        default: []
    }
},{timestamps: true}
);

module.exports = mongoose.model("Video", VideoSchema);