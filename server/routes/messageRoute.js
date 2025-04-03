const router = require('express').Router();
const { addMessage,getMessage } = require('../controllers/messageController');

router.post('/addmessage', addMessage)
router.post('/getmessage', getMessage)

module.exports = router;

