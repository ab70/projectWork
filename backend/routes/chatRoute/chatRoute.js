const express =require('express')
const router = express.Router()
const chatControllers = require('../../app/controllers/chatControllers')

router.post("/newmessage", chatControllers().addNewChat)
router.get("/getmessages/:user1/:user2", chatControllers().getMessage)



module.exports = router