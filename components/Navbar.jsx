import React from 'react'
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';

import 'app/globals.css';

const Navbar = () => {
  const {data: session} = useSession();

  if (session) {
    return(
      <div className='flex gap-5'>
        <Image
        className='rounded-full border-4 border-gray-500 ml-4'
        src={session.user.image}
        width={50}
        height={50}
        alt="user_profile"
        />

        <div className='absolute right-2'>
            <button onClick={() => signOut()} className='button_signin text-bold'>Sign Out</button>
        </div>
    </div>
    )
  } else {
  return (
    <div className='flex gap-5'>
        <Image
        className='rounded-full border-4 border-gray-500 ml-4'
        src="/default_profile.png"
        width={50}
        height={50}
        alt="user_profile"
        />

        <div className='absolute right-2'>
            <button onClick={() => signIn()}className='button_signin text-bold'>Sign In/Login</button>
        </div>
    </div>
  )
}
}

export default Navbar