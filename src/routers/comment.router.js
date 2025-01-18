import express from 'express';
import authenticateUser from '../middlewares/auth.middleware.js';
import { comment, deleteComment } from '../controllers/comment.controller.js';



const router = express.Router();

router.post('/comment' , authenticateUser , comment )
router.delete('/deleteComment/:id' , authenticateUser , deleteComment )


export default router
