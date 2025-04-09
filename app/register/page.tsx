'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { UserAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface FormData {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
}



const page: React.FC = () => {
  /*const [address, setAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { emailAndPasswordRegister } = UserAuth();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Handle sign-up logic here
    console.log('Email:', email);
    console.log('Password:', password);
    try {
      await emailAndPasswordRegister(firstName, lastName, email, password);
      router.push('/login');
    }
    catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border bg-slate-600 border-gray-300 rounded-lg p-8 w-80 shadow-lg">
        <h2 className="text-2xl mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label htmlFor="firstName" className="block mb-2">Firstname</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full text-black p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="middleName" className="block mb-2">middlename</label>
            <input
              type="text"
              id="middleName"
              value={middleName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full text-black p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block mb-2">Lastname</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full text-black p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-black p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-black p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Sign Up</button>
        </form>
      </div>
    </div>
  );
};*/

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { emailAndPasswordRegister } = UserAuth();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const { firstName, lastName, email, password } = data;
    try {
      await emailAndPasswordRegister(firstName, lastName, email, password);
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border bg-white border-gray-300 rounded-lg p-8 w-2/5 shadow-lg">
        <h2 className="text-2xl mb-6 text-center text-black">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="flex justify-between">
          <div className="mb-4 col-span-1">
            <label htmlFor="firstName" className="block mb-2 text-black">First Name</label>
            <input
              type="text"
              id="firstName"
              {...register('firstName', { required: true })}
              className="w-full text-black p-2 border border-gray-300 rounded"
            />
            {errors.firstName && <span className="text-red-500">First name is required</span>}
          </div>
          <div className="mb-4 col-span-1">
            <label htmlFor="lastName" className="block mb-2 text-black">Last Name</label>
            <input
              type="text"
              id="lastName"
              {...register('lastName', { required: true })}
              className="w-full text-black p-2 border border-gray-300 rounded"
            />
            {errors.lastName && <span className="text-red-500">Last name is required</span>}
          </div>
          </div>
          <div className="mb-4 col-span-1">
            <label htmlFor="middleName" className="block mb-2 text-black">Middle Name (optional)</label>
            <input
              type="text"
              id="middleName"
              {...register('middleName')}
              className="w-full text-black p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4 col-span-1">
            <label htmlFor="email" className="block mb-2 text-black">Email</label>
            <input
              type="email"
              id="email"
              {...register('email', { required: true })}
              className="w-full text-black p-2 border border-gray-300 rounded"
            />
            {errors.email && <span className="text-red-500">Email is required</span>}
          </div>
          <div className="mb-4 col-span-1">
            <label htmlFor="confirmEmail" className="block mb-2 text-black">Confirm Email</label>
            <input
              type="email"
              id="confirmEmail"
              {...register('confirmEmail', { required: true })}
              className="w-full text-black p-2 border border-gray-300 rounded"
            />
            {errors.confirmEmail && <span className="text-red-500">Confirm email is required</span>}
          </div>
          <div className="mb-4 col-span-1">
            <label htmlFor="password" className="block mb-2 text-black">Password</label>
            <input
              type="password"
              id="password"
              {...register('password', { required: true })}
              className="w-full text-black p-2 border border-gray-300 rounded"
            />
            {errors.password && <span className="text-red-500">Password is required</span>}
          </div>
          <div className="mb-4 col-span-1">
            <label htmlFor="confirmPassword" className="block mb-2 text-black">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', { required: true })}
              className="w-full text-black p-2 border border-gray-300 rounded"
            />
            {errors.confirmPassword && <span className="text-red-500">Confirm password is required</span>}
          </div>
          <div className='grid place-items-center'><button type="submit" className="col-span-2 w-1/2 p-2 bg-blue-500 text-white rounded">Sign Up</button></div>
        </form>
      </div>
    </div>
  );
};
export default page;