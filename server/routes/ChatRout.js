import express from 'express';
import { requiredSignIn } from '../middleware/authMiddleware.js';
import { accessChat, addToGroup, createGroupChat, fetchChat, removeFromGroup, renameGroup } from '../controller/ChatController.js';


const router = express.Router()

router.post('/', requiredSignIn, accessChat )
router.get('/', requiredSignIn, fetchChat)
router.post('/group', requiredSignIn, createGroupChat)
router.put('/rename', requiredSignIn, renameGroup)
router.put('/groupremove', requiredSignIn, removeFromGroup)
router.put('/groupadd', requiredSignIn, addToGroup)




export default router;