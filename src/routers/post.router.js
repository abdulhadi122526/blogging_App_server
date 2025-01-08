import express from 'express';
import authenticateUser from '../middlewares/auth.middleware.js';
import { creatPost, getPosts } from '../controllers/post.controller.js';


const router = express.Router();

router.post('/creatpost' , authenticateUser , creatPost )
router.get('/posts' , getPosts)


export default router;