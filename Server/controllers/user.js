const createError = require("../error")
const User = require("../models/User");
const Video = require("../models/Video");

const updateUser = async (req, res)=>{
    if(req.params.id === req.user.id)
    {
        try
        {
            const updateUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },{new: true}); 
            return res.status(200).json(updateUser);
        }
        catch(err)
        {
            return res.status(404).json(createError(404, "Not Found!"));
        }
    }
    else{
        return res.status(403).json(createError(403, "You can update only your account!"));
    }
}

const deleteUser = async (req, res)=>{
    if(req.params.id === req.user.id)
    {
        try
        {
            const delUser = await User.findByIdAndDelete(req.params.id);
            return res.status(200).json("User has been deleted!");
        }
        catch(err)
        {
            return res.status(404).json(createError(404, "Not Found!"));
        }
    }
    else{
        return res.status(403).json(createError(403, "You can delete only your account!"));
    }
}

const getUser = async (req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }
    catch(err)
    {
        return res.status(404).json(createError(404, "Not Found!"));
    }
}

const subscribe = async (req, res)=>{
    try{
        await User.findByIdAndUpdate(req.user.id,{
            $push: {subscribedUsers:req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{
            $inc: {subscribers: 1}
        });
        res.status(200).json("Subscription Successfull.");
    }
    catch(err)
    {
        return res.status(404).json(createError(404, "Not Found!"));
    }
}

const unsubscribe = async (req, res)=>{
    try{
        await User.findByIdAndUpdate(req.user.id,{
            $pull: {subscribedUsers:req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{
            $inc: {subscribers: -1}
        });
        res.status(200).json("Unsubscription Successfull.");
    }
    catch(err)
    {
        return res.status(404).json(createError(404, "Not Found!"));
    }
}

const like = async (req, res)=>{
    try{
        const id = req.user.id;
        const videoId = req.params.videoId;

        await Video.findByIdAndUpdate(videoId, {
            $addToSet: {likes: id},
            $pull: {dislikes: id}
        })
        res.status(200).json("Video has been liked");
    }
    catch(err)
    {
        console.log(err);
        return res.status(404).json(createError(404, "Not Found!"));
    }
}

const dislike = async (req, res)=>{
    try{
        const id = req.user.id;
        const videoId = req.params.videoId;

        await Video.findByIdAndUpdate(videoId, {
            $addToSet: {dislikes: id},
            $pull: {likes: id}
        })
        res.status(200).json("Video has been disliked");
    }
    catch(err)
    {
        return res.status(404).json(createError(404, "Not Found!"));
    }
}

module.exports = {updateUser, deleteUser, getUser, subscribe, unsubscribe, like, dislike};