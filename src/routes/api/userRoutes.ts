import { Router } from 'express';
const router = Router();
import { getUsers, getSingleUser, createUser, updateUser,  deleteUser, addFriend, removeFriend } from '../../controllers/userController.js';

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser);


// PUT update user
router.put('/:userId', updateUser);

// DELETE user
router.delete('/:userId', deleteUser);
// POST add friend
router.post('/:userId/friends/:friendId', addFriend);

// DELETE remove friend
router.delete('/:userId/friends/:friendId', removeFriend);


export default router;
