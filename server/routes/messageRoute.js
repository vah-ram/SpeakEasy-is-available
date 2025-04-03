// routes/messageRoute.js
import { Router } from 'express';  // import express router
import { addMessage, getMessage } from '../controllers/messageController.js';  // import controllers

const router = Router();

router.post('/addmessage', addMessage);
router.post('/getmessage', getMessage);

export default router;  // export as default
