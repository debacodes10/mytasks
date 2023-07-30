// TaskList.jsx
import React from 'react';
import { useSession } from 'next-auth/react';
import RemoveBtn from './RemoveBtn';

const getTasks = async () => {
  try {
    const task = await fetch('https://mytasks-jet.vercel.app/api/tasks/all', { cache: 'no-store' });
    const data = await task.json();
    return data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

const TaskList = () => {
  const [tasks, setTasks] = React.useState([]);
  const { data: session } = useSession();

  const fetchData = React.useCallback(async () => {
    const data = await getTasks();
    const userTasks = data.task.filter((task) => task.userEmail === session.user.email);
    setTasks(userTasks);
  }, [session.user.email]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Task deleted successfully!');
        fetchData(); // Fetch the updated tasks after deletion
      } else {
        console.error('Error deleting task:', response.statusText);
        // Handle any error scenarios, such as displaying an error message to the user.
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      // Handle any error scenarios, such as displaying an error message to the user.
    }
  };

  return (
    <div className="flex-col">
      <div className="task_list_container flex-col px-2 mt-6">
        {Array.isArray(tasks) && tasks.length > 0 ? (
          tasks.map((task) => (
            <div className="task_bar" key={task._id}>
              <RemoveBtn taskId={task._id} onDelete={handleDeleteTask} />
              <h2 className="task_heading px-2 py-2">{task.taskTitle}</h2>
              <h3 className="task_description px-2 py-2">{task.taskDescription}</h3>
            </div>
          ))
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
