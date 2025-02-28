import db from '../config/connection.js';
import { User } from '../models/User.js';
import Thought from '../models/Thought.js';
const users = [
    {
        name: 'John Doe',
        uniqueId: 'john123', // Added required uniqueId field
        email: 'john@example.com',
        password: 'password',
        thoughts: [],
        friends: []
    },
    {
        name: 'Jane Smith',
        uniqueId: 'jane456', // Added required uniqueId field
        email: 'jane@example.com',
        password: 'password',
        thoughts: [],
        friends: []
    }
];
export const randomThoughts = [
    'I am thinking about the beach',
    'I am thinking about the sun',
    'I am thinking about all my friends',
    'I am thinking about the best day ever!',
    'I am thinking about summer vacation!'
];
function getRandomThought() {
    return randomThoughts[Math.floor(Math.random() * randomThoughts.length)];
}
async function seedDatabase() {
    try {
        const connection = await db();
        if (!connection) {
            console.error('Failed to connect to the database');
            return;
        }
        // Clear existing data
        await User.deleteMany({});
        await Thought.deleteMany({});
        console.log('Database cleared. Creating users...');
        // Create users
        const createdUsers = [];
        for (let i = 0; i < users.length; i++) {
            const user = await User.create(users[i]);
            createdUsers.push(user);
            console.log(`Created user: ${user.name}`);
        }
        console.log('Creating thoughts...');
        // Create thoughts
        const thoughts = [];
        for (let i = 0; i < 5; i++) {
            const randomUserIndex = Math.floor(Math.random() * createdUsers.length);
            const user = createdUsers[randomUserIndex];
            const thoughtText = `I am ${user.name} and I am thinking about ${getRandomThought()}`;
            const thoughtData = {
                thoughtText,
                username: user.name,
                createdAt: new Date()
            };
            try {
                const thought = await Thought.create(thoughtData);
                thoughts.push(thought);
                // Add thought to user's thoughts array
                user.thoughts.push(thought._id);
                await user.save();
                console.log(`Created thought: "${thoughtText.substring(0, 30)}..."`);
            }
            catch (err) {
                console.error('Error creating thought:', err);
            }
        }
        // Add some friends
        for (let i = 0; i < createdUsers.length; i++) {
            const user = createdUsers[i];
            // Add 1-2 random friends (not including self)
            const potentialFriends = createdUsers.filter(u => u._id.toString() !== user._id.toString());
            if (potentialFriends.length > 0) {
                const numFriends = Math.floor(Math.random() * 2) + 1; // 1 or 2 friends
                for (let j = 0; j < Math.min(numFriends, potentialFriends.length); j++) {
                    const friendIndex = Math.floor(Math.random() * potentialFriends.length);
                    const friend = potentialFriends[friendIndex];
                    // Add friend to user's friends array if not already there
                    if (!user.friends.some(f => f.toString() === friend._id.toString())) {
                        user.friends.push(friend._id);
                        friend.friends.push(user._id);
                        await user.save();
                        await friend.save();
                        console.log(`Added friend relationship: ${user.name} <-> ${friend.name}`);
                    }
                    // Remove from potential friends to avoid duplicates
                    potentialFriends.splice(friendIndex, 1);
                }
            }
        }
        console.log('Database seeded successfully!');
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
