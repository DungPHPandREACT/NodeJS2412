import { Router } from 'express';
import { createUserWithProfile, deleteUser, getUsers } from '../controllers/user.controller';

const router = Router();

router.post('/', createUserWithProfile);
router.get('/', getUsers);
router.delete('/:id', deleteUser)

export default router;
