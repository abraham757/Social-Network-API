import { User } from '../models/User.js';
import { Request, Response } from 'express';

  export const getUsers = async(_req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export const getSingleUser = async(req: Request, res: Response) => {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
         res.status(404).json({ message: 'No user with that ID' });
      } else {
        res.json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // create a new user
  export const createUser = async(req: Request, res: Response) => {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  }

    // create a new user
    export const updateUser = async(req: Request, res: Response) => {
      try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId,req.body, {new: true});
        res.json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    }
    export const deleteUser = async (req: Request, res: Response) => {
      const deletedUser = await User.findByIdAndDelete(req.params.userId);
      res.json(deletedUser);
  };


  export const addFriend = async (req: any, res: { json: (arg0: any) => void; status: (code: number) => any }) => {
    try {
        const user = await User.findById(req.params.userId);
        const friend = await User.findById(req.params.friendId);
        
        if (!user || !friend) {
            return res.status(404).json({ message: "User or friend not found" });
        }
        
        if (user.friends.includes(friend._id)) {
            return res.status(400).json({ message: "Already friends" });
        }
        
        user.friends.push(friend._id);
        
        friend.friends.push(user._id);
        
        await user.save();
        await friend.save();
        
        res.json(user);
    }
    catch (err) {     
        res.status(500).json(err);
    }
};

  export const removeFriend = async (req: Request, res: Response) => {
    const user = await User.findById(req.params.userId);
    const friend = await User.findById(req.params.friendId);
    if (user && friend) {
        user.friends = user.friends.filter((friendId: any) => friendId.toString() !== req.params.friendId);
        friend.friends = friend.friends.filter((userId: any) => userId.toString() !== req.params.userId);
        await user.save();
        await friend.save();
        res.json(user);
    }
};