import mongoose from 'mongoose';

const boardMemberSchema = new mongoose.Schema({
  committeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Committee',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  post: {
    type: String,
    required: true,
    trim: true
  },
  photoUrl: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

boardMemberSchema.index({ committeeId: 1, order: 1 });

export default mongoose.model('BoardMember', boardMemberSchema);
