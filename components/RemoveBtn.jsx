import React from 'react';
import { AiFillDelete } from 'react-icons/ai';

const deleteTask = async (taskId) => {
  try {
    console.log(taskId)
    const response = await fetch(`https://mytasks-jet.vercel.app/api/tasks/all?id=${taskId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log('Task deleted successfully!');
      // Perform any additional actions after successful deletion, such as updating the UI.
    } else {
      console.error('Error deleting task:', response.statusText);
      // Handle any error scenarios, such as displaying an error message to the user.
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    // Handle any error scenarios, such as displaying an error message to the user.
  }
};

const RemoveBtn = ({ taskId }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
        
      await deleteTask(taskId); // Use 'await' to ensure the task is deleted before reloading the UI
     window.location.reload(); // Reload the page after successful deletion
    }
  };

  return (
    <button className='absolute right-0 px-8 mt-4' onClick={handleDelete}>
      <AiFillDelete size={30} />
    </button>
  );
};

export default RemoveBtn;
