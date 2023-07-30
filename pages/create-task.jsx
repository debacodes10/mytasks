import React from 'react'
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import Navbar from '@/components/Navbar'
import TaskForm from '@/components/TaskForm';

const create_task = () => {
    const {data:session} = useSession();
    const router = useRouter();

    if(session) {
  return (
    <div className='flex-col gap-5 px-2 py-2'>
        <Navbar />
        <div className='create_task_heading_container flex-col gap-5 mt-8 '>
            <h1 className='create_task_heading'>Create Task</h1>
        </div>
        <div>
            <TaskForm />
        </div>
    </div>
  )
} else {
    return(
        <div className='flex items-center justify-center mt-80'>
            <button className='redirect_button font-bold' onClick={() => router.push('/')}>Go to Home Page</button>
        </div>
    )
}
}

export default create_task