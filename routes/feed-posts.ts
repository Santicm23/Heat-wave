
import { Router } from 'express';

import { deleteFeedPost, getFeedPost, getFeedPosts, postFeedPost, putFeedPost } from '../controllers/feed-posts';
import { validateFileToUpload } from '../middlewares/validate-files';
import validateJWT from '../middlewares/validate-jwt';
import validateParams from '../middlewares/validate-params';


const router = Router();

router.get('/', getFeedPosts);

router.get('/:id', getFeedPost);

router.post('/', [
    validateJWT,
    validateFileToUpload,
    validateParams
], postFeedPost);

router.put('/:id', putFeedPost);

router.delete('/:id', deleteFeedPost);


export default router;