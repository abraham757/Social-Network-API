import Thought from '../models/Thought.js';
import User from '../models/User.js';
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
export const updateThought = async (req, res) => {
    const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(thought);
};
export const deleteThought = async (req, res) => {
    const user = await User.findOne({ thoughts: req.params.id });
    if (user) {
        user.thoughts = user.thoughts.filter((thoughtId) => thoughtId.toString() !== req.params.id);
        await user.save();
    }
    await Thought.findByIdAndDelete(req.params.id);
    res.json({ message: 'Thought deleted!' });
};
export const addReaction = async (req, res) => {
    const thought = await Thought.findById(req.params.thoughtId);
    if (thought) {
        thought.reactions.push(req.body);
        await thought.save();
        res.json(thought);
    }
    else {
        res.status(404).json({ message: 'Thought not found' });
    }
};
export const removeReaction = async (req, res) => {
    const thought = await Thought.findById(req.params.thoughtId);
    if (thought) {
        thought.reactions.pull({ reactionId: req.params.reactionId });
        await thought.save();
        res.json(thought);
    }
    else {
        res.status(404).json({ message: 'Thought not found' });
    }
};
