import express from 'express';
import {
	addAuthor,
	deleteAuthor,
	getAuthor,
	getAuthors,
	updateAuthor,
} from '../controllers/author.controller';

const router = express.Router();

// /api/v1/authors
router.post('/', addAuthor);
router.get('/', getAuthors);
router.get('/:id', getAuthor);
router.put('/:id', updateAuthor);
router.delete('/:id', deleteAuthor);

export default router;
