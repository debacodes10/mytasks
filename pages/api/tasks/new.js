import { connectToDB } from '@/utils/mongodb';
import Task from '@/models/tasks';

export default async function handler(req, res) {
  await connectToDB();
  if (req.method === 'POST') {
    try {
      // Extract task data from the request body
      const { userEmail, taskTitle, taskDescription } = req.body;

      // Create a new task object using the Task model
      const newTask = new Task({
        userEmail,
        taskTitle,
        taskDescription,
      });


      // Save the new task to the database
      const savedTask = await newTask.save();

      res.status(201).json({ success: true, data: savedTask });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: 'Error creating task' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
