import { Router } from 'express';

import { getThoughts, getSingleThought, createThought, updateThought, 
    deleteThought, 
    addReaction, 
    removeReaction } from '../../controllers/thoughtController.js';

const router = Router();
// /api/thought
router.route('/').get(getThoughts).post(createThought);

// /api/users/:userId
router.route('/:thoughtId').get(getSingleThought);

// POST new thought
router.post('/', createThought);

// PUT update thought
router.put('/:id', updateThought);
// DELETE thought
router.delete('/:id', deleteThought);
// POST reaction 
router.post('/:thoughtId/reactions', addReaction);

// DELETE reaction
router.delete('/:thoughtId/reactions/:reactionId', removeReaction);

export default router;