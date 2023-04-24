
import { Router } from 'express';

import { deletePost, getPost, getPosts, postPost, putPost } from '../controllers/posts';


const router = Router();

router.get('/', getPosts);

router.get('/:id', getPost);

router.post('/', postPost);

router.put('/:id', putPost);

router.delete('/:id', deletePost);


export default router;