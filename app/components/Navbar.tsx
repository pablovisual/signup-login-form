import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext'

type Props = {}

const Navbar = () => {
  const { user, googleSignIn, logOut} = UserAuth();
  const [loading, setLoading] = useState(true);
  
  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.error(error)
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
    }
    catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
  
    checkAuthentication();
  }, [user]);

  return (
    <div className='h-20 w-full border-b-2 flex items-center justify-between p-2'>
      <ul className='flex'>
        <li className='p-2 cursor-pointer text-black'>
          <Link href="/">Home</Link>
        </li>
        <li className='p-2 cursor-pointer text-black'>
          <Link href="/about">About</Link>
        </li>
        {!user ? null : (
          <li className='p-2 cursor-pointer text-black'>
            <Link href="/profile">Profile</Link>
          </li>
      )}
      </ul>

    {loading ? null : !user ? (<ul className='flex'>
        <li onClick={handleSignIn} className='p-2 cursor-pointer text-black'>
          Sign In
        </li>
        <li onClick={handleSignIn} className='p-2 cursor-pointer text-black'>
          Login
        </li>
      </ul>) : (
        <div>
          <p>Welcome, { user.displayName }</p>
          <p onClick={ handleLogout } className='cursor-pointer text-black'>Sign Out</p>
        </div>
      ) }
      
    </div>
  )
}

export default Navbar