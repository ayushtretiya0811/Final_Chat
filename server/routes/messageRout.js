import express from 'express';
import { requiredSignIn } from '../middleware/authMiddleware.js';
import { allMessage, sendMessage } from '../controller/messageController.js';


const router = express.Router()

router.post('/', requiredSignIn, sendMessage)
router.get('/:chatId', requiredSignIn, allMessage)

export default router