const {signup, signin} = require("../controllers/auth");

const router = require("express").Router();


//create a User

router.post("/signup", signup);

//Sign IN

router.post("/signin", signin)

//google AUTH

router.post("/google", )

  

module.exports = router;