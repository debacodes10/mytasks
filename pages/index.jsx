'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import Navbar from '@/components/Navbar';

const page = () => {
    const {data: session} = useSession();
    const router = useRouter();

    if (!session) {
  return (
    <div className='w-full flex-col gap-5 mt-4'>
      <Navbar />
    <div className='mt-64'>
      <h1 className=' website_name text-center font-bold'>MyTasks</h1>
      <p className='index_desc'>Stay updated with all your tasks with MyTasks!</p>
      <p className='index_desc'>Sign in to add your first task!</p>
    </div>

    </div>
  )} else {
    return(
      <div className='w-full flex-col gap-5 mt-4'>
      <Navbar />
        <div className='mt-64'>
          <h1 className=' website_name text-center font-bold'>MyTasks</h1>
          <p className='index_desc'>Stay updated with all your tasks with MyTasks!</p>
          <p className='index_desc'>Add your first task!</p>
        </div>
        <div className='flex items-center justify-center mt-16 font-bold'>
          <button className='index_btn_task' onClick={() => router.push('/home')}>Add task!</button>
        </div>
        </div>
    )
    }
  }

export default page;