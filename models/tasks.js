import { Schema, model, models } from 'mongoose';

const TaskSchema = new Schema({
  userEmail: {
    type: String,
    required: [true, "You must be signed in to add a task!"]
  },
  taskTitle: {
    type: String,
    required: [true, "Task title is required!"]
  },
  taskDescription: {
    type: String
  }
});

const Task = models.Task || model("Task", TaskSchema);

export default Task;
