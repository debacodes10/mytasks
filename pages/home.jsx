'use client';

import React from 'react'
import Navbar from '@/components/Navbar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FcPlus } from 'react-icons/fc';
import TaskList from '@/components/TaskList';



const home = () => {
const {data: session} = useSession();
const router = useRouter();

if(session) {
return (
    <div className='w-full flex-col gap-5 mt-5 px-4'>
        <div className='mt-4'><Navbar /></div>
        <div className='heading_tasks flex gap-5 mt-8 px-4'>
        <h1 className='font-bold'>
            My Tasks
        </h1>
        <div className='container absolute right-2 flex-col'>
        <button onClick={() => router.push('/create-task')} className='absolute right-0 px-6 mt-6'><FcPlus className='add_btn' size={30}/></button>
        </div>
        </div>
        <div>
        <TaskList />
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


export default home;