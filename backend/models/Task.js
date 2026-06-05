import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      // These are your Kanban columns!
      enum: ['Backlog', 'To Do', 'In Progress', 'Code Review', 'Testing', 'Done'],
      default: 'To Do',
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // This creates a relationship to your User database
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true } // Automatically tracks when tasks move or are created
);

const Task = mongoose.model('Task', taskSchema);
export default Task;