import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const TaskForm = () => {
    const router = useRouter();
    const{data:session} = useSession();
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Create a task object with the form data
      const taskData = {
        userEmail: session.user.email,
        taskTitle,
        taskDescription,
      };

      // Send a POST request to the API endpoint (new.js) with the taskData
      const response = await fetch('http://localhost:3000/api/tasks/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        // Task creation successful
        console.log('Task created successfully!');
        // Reset the form fields
        setTaskTitle('');
        setTaskDescription('');
        router.push('/home')
      } else {
        // Task creation failed
        console.error('Error creating task:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <form className='flex-col gap-5 px-4 mt-4' onSubmit={handleSubmit}>
      <div>
        <input
          className='task_title_input py-4'
          placeholder='Task Title'
          value={taskTitle}
          onChange={(event) => setTaskTitle(event.target.value)}
        />
      </div>
      <div>
        <input
          className='task_description_input mt-4'
          placeholder='Task Description'
          value={taskDescription}
          onChange={(event) => setTaskDescription(event.target.value)}
        />
      </div>
      <button className='create_task_button mt-8 ' type='submit'>Create</button>
    </form>
  );
};

export default TaskForm;
