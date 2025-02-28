import Thought from '../models/Thought.js';
export const getThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const getSingleThought = async (req, res) => {
    try {
        const thoughts = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v');
        if (!thoughts) {
            res.status(404).json({ message: 'No Thought with that ID' });
        }
        else {
            res.json(thoughts);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// create a new Thought
export const createThought = async (req, res) => {
    try {
        const dbThoughtData = await Thought.create(req.body);
        res.json(dbThoughtData);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
