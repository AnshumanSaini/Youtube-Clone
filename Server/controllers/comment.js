const createError = require("../error");
const Comment = require("../models/Comments");
const Video = require("../models/Video");

const addComment = async (req, res)=>{
    try
    {
        const newComment = new Comment({...req.body, userId: req.user.id});
        const result = await newComment.save();
        res.status(200).json(result);
    }
    catch(err)
    {
        res.status(404).json(createError(404, "Not found!"));
    }
}

const getComments = async (req, res)=>{
    try
    {
        const comment = await Comment.find({videoId: req.params.videoId});
        res.status(200).json(comment);
    }
    catch(err)
    {
        res.status(404).json(createError(404, "Not found!"));
    }
}

const deleteComment = async (req, res)=>{
    try
    {
        const comment = await Comment.findById(req.params.id);
        const video = await Video.findById(req.params.id);

        if(req.user.id === comment.userId || req.user.id === video.userId)
        {
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json("The Comment has deleted");
        }
    }
    catch(err)
    {
        res.status(404).json(createError(404, "You can delete only your comment!"));
    }
}

module.exports = {addComment, getComments, deleteComment};