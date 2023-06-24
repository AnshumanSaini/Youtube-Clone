const {updateVideo, addVideo, deleteVideo, getVideo, addView, random, trend, sub, tag, search} = require("../controllers/video");
const verifyToken = require("../verifyToken");

const router = require("express").Router();

//Create a video
router.post("/", verifyToken, addVideo);
router.put("/:id", verifyToken, addVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.get("/find/:id", getVideo);
router.put("/view/:id", addView);
router.get("/trend", trend);
router.get("/random", random);
router.get("/sub",verifyToken, sub);
router.get("/tag",verifyToken, tag);
router.get("/search",verifyToken, search);


module.exports = router;