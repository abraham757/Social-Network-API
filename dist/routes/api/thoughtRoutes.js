import { Router } from 'express';
const router = Router();
import { getThoughts, getSingleThought, createThought } from '../../controllers/thoughtController.js';
// /api/thought
router.route('/').get(getThoughts).post(createThought);
// /api/users/:userId
router.route('/:thoughtId').get(getSingleThought);
export default router;
