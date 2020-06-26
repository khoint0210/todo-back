import mongoose, { Schema } from 'mongoose';

const TaskSchema = new Schema({
  value: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  isRemoved: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

TaskSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      value: this.value,
      isCompleted: this.isCompleted,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  },
};

export default mongoose.model('Task', TaskSchema);
