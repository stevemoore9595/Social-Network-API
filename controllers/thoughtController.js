// ObjectId() method for converting thoughtId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');


module.exports = {
  
  async getAllThoughts(req, res) {
    try {
      const thoughtData = await Thought.find();
      const thoughtObj = {
        thoughts,
        headCount: await headCount(),
      };
      return res.json(thoughtObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // getThought
  async getThought(req, res) {
    try {
      const thoughtData = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')

      if (!thoughtData) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json();
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // createThought
  async createThought(req, res) {
    try {
      const thoughtData = await Thought.create(req.body);
      // res.json(thoughtData);
      if(thoughtData){
        await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $push: { thoughts: thoughtData._id }},
          { new: true }
        );
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
// updateThought
  async updateThought(req, res) {
    try {
      const thoughtData = await User.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thoughtData) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // deleteThought
  async deleteThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

      if (!thoughtData) {
        return res.status(404).json({ message: 'No such thought exists' })
      }

      const userData = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!userData) {
        return res.status(404).json({
          message: 'Thought deleted, but no user found',
        });
      }

      res.json({ message: 'Thought successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // addReaction
  async addReaction(req, res) {
    try {
      console.log('You are adding a reaction');
      console.log(req.body);
      const thoughtData = await Reaction.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thoughtData) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID :(' })
      }

      res.json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // removeReaction
  async removeReaction(req, res) {
    try {
      const reactionData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!reactionData) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID :(' });
      }

      res.json(reactionData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
