const express = require("express");
const connectToMongo = require("./dbs");
const userRoutes = require("./routes/users");
const videoRoutes = require("./routes/videos");
const commentRoutes = require("./routes/comments");
const authRoutes = require("./routes/auth");
const cookieParser = require('cookie-parser');
const app = express();

connectToMongo();

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/auth", authRoutes);


app.listen(8800, ()=>{
    console.log("Server is listening at port 8800");
})