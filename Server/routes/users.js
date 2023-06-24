const {getUser, updateUser, deleteUser, subscribe, unsubscribe, like, dislike} = require("../controllers/user");
const verifyToken = require("../verifyToken");

const router = require("express").Router();

//Update user
router.put("/:id", verifyToken, updateUser);

//delete user
router.delete("/:id", verifyToken, deleteUser);

//get a user
router.get("/find/:id", getUser);

//subscribe a user
router.put("/sub/:id", verifyToken, subscribe);

//unsubscribe a user
router.put("/unsub/:id", verifyToken, unsubscribe);

//like a video
router.put("/like/:id",verifyToken, like);

//dislike a video
router.put("/dislike/:id", verifyToken, dislike);

module.exports = router;