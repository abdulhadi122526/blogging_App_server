import express from 'express';
import authenticateUser from '../middlewares/auth.middleware.js';
import { comment } from '../controllers/comment.controller.js';



const router = express.Router();

router.post('/comment' , authenticateUser , comment )

export default router
