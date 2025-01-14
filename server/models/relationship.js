const mongoose = require('mongoose');

const relationshipSchema = new mongoose.Schema(
  {
    userId1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    userId2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['follow', 'friend'], 
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'none'],
      default: 'none', 
    }
  },
  { timestamps: true } 
);

// Đảm bảo userId1 và userId2 không trùng lặp
relationshipSchema.index({ userId1: 1, userId2: 1, type: 1 }, { unique: true });

const Relationship = mongoose.model('Relationship', relationshipSchema);

module.exports = Relationship;
