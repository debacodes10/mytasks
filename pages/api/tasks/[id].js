import { ObjectId } from 'mongodb';
import { connectToDB } from '@/utils/mongodb';
import Task from '@/models/tasks';

export default async function handler(req, res) {
  await connectToDB();

  if (req.method === 'GET') {
    try {
      // Get the task ID from the query parameters
      const { id } = req.query;

      // Validate that the provided ID is a valid ObjectId
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: 'Invalid task ID' });
      }

      // Find the task by its ID in the database
      const task = await Task.findById(id);

      if (!task) {
        return res.status(404).json({ success: false, error: 'Task not found' });
      }

      res.status(200).json({ success: true, data: task });
    } catch (error) {
      console.error('Error fetching task:', error);
      res.status(500).json({ success: false, error: 'Error fetching task' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
