import { Router } from 'express';
const router = Router();
import { getUsers, getSingleUser, createUser, updateUser,  deleteUser} from '../../controllers/userController.js';

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser);


// PUT update user
router.put('/:userId', updateUser);

// DELETE user
router.delete('/:userId', deleteUser);



export default router;
