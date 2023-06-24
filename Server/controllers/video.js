const createError = require("../error");
const Video = require("../models/Video");
const User = require("../models/User");

const addVideo = async (req, res)=>{
    const newVideo = new Video({
        userId: req.user.id, ...req.body
    });

    try
    {
        const saveVideo = await newVideo.save();
        res.status(200).json(saveVideo);
    }
    catch(err){
        res.status(404).json(createError(404, "Not Found!"));
    }
}

const updateVideo = async (req, res)=>{
    try
    {
        const video = await Video.findById(req.params.id);
        if(!video) return res.status(404).json(createError(404, "Video not found!"));

        if(req.user.id === video.userId)
        {
            const updateVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {new: true});
            
            res.status(200).json(updateVideo);
        }
        else
        {
            return res.status(403).json(createError(403, "You can update only your video!"));
        }
    }
    catch(err){
        res.status(404).json(createError(404, "Not Found!"));
    }
    
}

const deleteVideo = async (req, res)=>{
    try
    {
        const video = await Video.findById(req.params.id);
        if(!video) return res.status(404).json(createError(404, "Video not found!"));

        if(req.user.id === video.userId)
        {
            const deleteVideo = await Video.findByIdAndDelete(req.params.id);
            
            res.status(200).json("The video has been deleted!");
        }
        else
        {
            return res.status(403).json(createError(403, "You can delete only your video!"));
        }
    }
    catch(err){
        res.status(404).json(createError(404, "Not Found!"));
    }
    
}

const getVideo = async (req, res)=>{
    try
    {
        const video = await Video.findById(req.params.id);
        res.status(200).json(video);
    }
    catch(err){
        res.status(404).json(createError(404, "Not Found!"));
    }
    
}

const addView = async (req, res)=>{
    try
    {
        const video = await Video.findByIdAndUpdate(req.params.id, {
            $inc: {views: 1}
        });
        res.status(200).json("The view has been increased.");
    }
    catch(err){
        res.status(404).json(createError(404, "Not Found!"));
    }
    
}

const random = async (req, res)=>{
    try
    {
        const videos = await Video.aggregate([{$sample: {size: 40}}]);
        res.status(200).json(videos);
    }
    catch(err){
        res.status(404).json(createError(404, "Not Found!"));
    }
    
}

const trend = async (req, res)=>{
    try
    {
        const videos = await Video.find().sort({views:-1});
        res.status(200).json(videos);
    }
    catch(err){
        res.status(404).json(createError(404, "Not Found!"));
    }
    
}

const sub = async (req, res)=>{
    try
    {
        const user = await User.findById(req.user.id);
        const subscribedChannels = user.subscribedUsers;

        const list = await Promise.all(
            subscribedChannels.map((channelId)=>{
                return Video.find({userId: channelId});
            })
        );

        res.status(200).json(list.flat().sort((a, b)=> b.createdAt-a.createdAt));
    }
    catch(err){
        console.log(err);
        res.status(404).json(createError(404, "Not Found!"));
    }
    
}

const tag = async (req, res)=>{
    const tags = req.query.tags.split(",");
    console.log(tags);
    try
    {
        const videos = await Video.find({tags : {$in: tags}}).limit(20);
        res.status(200).json(videos);
    }
    catch(err){
        res.status(404).json(createError(404, "Not Found!"));
    }
    
}

const search = async (req, res)=>{
    const query = req.query.q
    try
    {
        const videos = await Video.find({title: {$regex: query, $options: "i"}}).limit(40);
        res.status(200).json(videos);
    }
    catch(err){
        res.status(404).json(createError(404, "Not Found!"));
    }
    
}

module.exports = {addVideo, updateVideo, deleteVideo, getVideo, addView, random, trend, sub, tag, search};