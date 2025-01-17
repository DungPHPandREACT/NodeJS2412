import { Router } from 'express';
import { createComment, getCommentsByPostId } from '../controllers/comment.controller';
import { getPosts } from '../controllers/post.controller';

const router = Router();

router.post('/', createComment);
router.get('/:post_id', getCommentsByPostId);

export default router;
