import { connectToDB } from '@/utils/mongodb';
import Task from '@/models/tasks';

export default async function handler(req, res) {
  await connectToDB();

  if (req.method === 'GET') {
    try {
      const tasks = await Task.find();
      res.status(200).json({ task: tasks });
    } catch (error) {
      console.error('Error fetching task IDs:', error);
      res.status(500).json({ success: false, error: 'Error fetching task IDs' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      console.log(id)
      const deletedTask = await Task.findByIdAndDelete(id);
      if (!deletedTask) {
        return res.status(404).json({ success: false, error: 'Task not found' });
      }
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ success: false, error: 'Error deleting task' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
