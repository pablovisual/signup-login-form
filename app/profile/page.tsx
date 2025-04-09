'use client';
import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext';

type Props = {}

const page = () => {

  const { user } = UserAuth();
    const [loading, setLoading] = useState(true);

  useEffect(() => {
      const checkAuthentication = async () => {
        await new Promise((resolve) => setTimeout(resolve, 50));
        setLoading(false);
      };
    
      checkAuthentication();
    }, [user]);
  return (
    <div className="p-4">
      {loading ? <p>Loading...</p> : user ? (
        <p>
          Welcome, { user.displayName } - you are logged into the profile page page - a protected route.
        </p>
      ) : (
        <p>
          You are not logged in. Please sign in to view this page.
        </p>
      )}
    </div>
  )
}

export default page