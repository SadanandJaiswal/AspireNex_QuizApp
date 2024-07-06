"use client";
import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';

const GetStartedButton = () => {
  const { data: session } = useSession();

  return (
    <div className='mt-8'>
      {session?.user?.id ? (
        <Link href='/quizzes' className='px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300'>  
        Get Started
    </Link>
      ) : (
        <button
          onClick={() => signIn()}
          className='px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300'
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default GetStartedButton;
