import express from 'express';
import authenticateUser from '../middlewares/auth.middleware.js';
import { likePost } from '../controllers/like.controller.js';



const router = express.Router();

router.post('/like' , authenticateUser , likePost )



export default router;