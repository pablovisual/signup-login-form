'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from '@/components/ui/separator';
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

interface FormData {
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
}

const signUpSchema = z.object({
  firstName: z.string().min(2, { message: 'First name is required' }),
  lastName: z.string().min(2, { message: 'Last name is required' }),
  middleName: z.string().optional(),
  email: z.string().toLowerCase().email({ message: 'Invalid email address' }),
  confirmEmail: z.string().toLowerCase().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  confirmPassword: z.string().min(1, { message: 'Please confirm your password' }),
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: 'custom',
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });
  }
  if (data.email !== data.confirmEmail) {
    ctx.addIssue({
      code: 'custom',
      message: 'Email do not match',
      path: ['confirmEmail'],
    });
  }
});



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

  const { emailAndPasswordRegister, githubAccount, googleAccount, xAccount } = UserAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      middleName: '',
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: ''
    },
    mode: "onChange"
  });

  const signUp = async (data: FormData) => {
    const { firstName, lastName, email, password } = data;
    try {
      await emailAndPasswordRegister(firstName, lastName, email, password);
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  const githubSignUp = async () => {
    try {
      await githubAccount();
      await new Promise(resolve => setTimeout(resolve, 2000));
      router.push('/');
    }

    catch (error) {
      console.error(error);
    };
  }

  const googleSignUp = async () => {
    try {
      await googleAccount();
      await new Promise(resolve => setTimeout(resolve, 2000));
      router.push('/');
    } catch (error) {
      console.error(error)
    }
  };

  const xSignUp = async () => {
    try {
      await xAccount();
      await new Promise(resolve => setTimeout(resolve, 2000));
      router.push('/');
    }

    catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-primay-50 to-primary-100 flex items-center justify-center p-4'>
      <Card className='w-full max-w-md mx-auto'>
        <CardHeader className='text-center'>
          <CardTitle>Creante an Account</CardTitle>
          <CardDescription>Enter your credentials to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(signUp)} className="space-y-4">
            <div className="w-full flex items-center justify-between">
              <div className="space-y-2">
                <Label htmlFor="Firstname">Firstname</Label>
                <Input
                  className='rounded-full'
                  id="firstName"
                  type="firstName"
                  placeholder="Firstname"
                  {...register("firstName", { required: true })}
                />
                {errors.firstName && (<span className="text-red-500 whitespace-nowrap">{errors.firstName?.message}</span>)}
              </div>
              <div className="space-y-2">
                <Label htmlFor="Lastname">Lastname</Label>
                <Input
                  className='rounded-full'
                  id="Lastname"
                  type="Lastname"
                  placeholder="Lastname"
                  {...register("lastName", { required: true })}
                />
                {errors?.lastName && <span className="text-red-500 whitespace-nowrap">{errors?.lastName.message}</span>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="Middlename">Middlename</Label>
              <Input
                className='rounded-full'
                id="Middlename"
                type="Middlename"
                placeholder="Middlename (optional)"
                {...register("middleName")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                className='rounded-full'
                id="emaile"
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Confirm Email</Label>
              <Input
                className='rounded-full'
                id="confirmEmail"
                type="email"
                placeholder="Confirm Email"
                {...register("confirmEmail", { required: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                className='rounded-full'
                id="password"
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                className='rounded-full'
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
            </div>
            <Button type="submit" className="w-full rounded-full">
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col -mt-4">
          <div className="relative max-[767.90px]:w-[44%] my-4 md:w-[34%] flex items-center justify-center">
            <Separator className='' />
            <div className="py-1 px-1.5 border uppercase text-black  rounded-full text-nowrap text-center bg-muted text-xs mx-1 ">
              <span className='max-[767.90px]:hidden'>or sign-up with</span>
              <span className='md:hidden'>or</span>
            </div>
            <Separator className='' />
          </div>
          <div className='max-[767.90px]:space-y-4 max-[767.90px]:w-full md:flex md:items-center md:space-x-4'>
            <Button type="button" onClick={githubSignUp} className="w-full max-[767.90px]:flex max-[767.90px]:items-center max-[767.90px]:space-x-1 rounded-full py-3 px-8">
              <span className='md:hidden uppercase'>sign-up with</span>
              <FaGithub />
            </Button>
            <Button type="button" onClick={googleSignUp} className="w-full max-[767.90px]:flex max-[767.90px]:items-center max-[767.90px]:space-x-1 rounded-full py-3 px-8">
              <span className='md:hidden uppercase'>sign-up with</span>
              <FcGoogle />
            </Button>
            <Button type='button' onClick={xSignUp} className="w-full max-[767.90px]:flex max-[767.90px]:items-center max-[767.90px]:space-x-1 rounded-full py-3 px-8">
              <span className='md:hidden uppercase'>sign-up with</span>
              <FaXTwitter />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
    /*<div className="flex justify-center items-center h-screen">
      <div className="border bg-white border-gray-300 rounded-lg p-8 w-2/5 shadow-lg">
        <h2 className="text-2xl mb-6 text-center text-black">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="lg:flex justify-between">
          <div className="mb-4 flex flex-col">
            <label htmlFor="firstName" className="mb-2 text-black">First Name</label>
            <input
              type="text"
              id="firstName"
              {...register('firstName', { required: true })}
              className="w-full text-black p-2 border border-gray-300 rounded"
            />
            {errors.firstName && (<span className="text-red-500 whitespace-nowrap">{errors.firstName?.message}</span>)}
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="lastName" className="mb-2 text-black">Last Name</label>
            <input
              type="text"
              id="lastName"
              {...register('lastName', { required: true })}
              className="w-full text-black p-2 border border-gray-300 rounded"
            />
            {errors?.lastName && <span className="text-red-500 whitespace-nowrap">{errors?.lastName.message}</span>}
          </div>
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="middleName" className="mb-2 text-black">Middle Name (optional)</label>
            <input
              type="text"
              id="middleName"
              {...register('middleName')}
              className="w-full text-black p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="email" className="mb-2 text-black">Email</label>
            <input
              type="email"
              id="email"
              {...register('email', { required: true })}
              className="w-full text-black p-2 border border-gray-300 rounded"
            />
            {errors?.email && <span className="text-red-500">{errors?.email.message}</span>}
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="confirmEmail" className="mb-2 text-black">Confirm Email</label>
            <input
              type="email"
              id="confirmEmail"
              {...register('confirmEmail', { required: true })}
              className="w-full text-black p-2 border border-gray-300 rounded"
            />
            {errors.confirmEmail && <span className="text-red-500">{errors.confirmEmail?.message}</span>}
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="password" className="mb-2 text-black">Password</label>
            <input
              type="password"
              id="password"
              {...register('password', { required: true })}
              className="w-full text-black p-2 border border-gray-300 rounded"
            />
            {errors.password && <span className="text-red-500">{errors.password?.message}</span>}
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="confirmPassword" className="mb-2 text-black">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', { required: true })}
              className="w-full text-black p-2 border border-gray-300 rounded"
            />
            {errors.confirmPassword?.message && <span className="text-red-500">{errors.confirmPassword?.message}</span>}
          </div>
          <div className='grid place-items-center'><button type="submit" className="col-span-2 w-1/2 p-2 bg-blue-500 text-white rounded">Sign Up</button></div>
        </form>
      </div>
    </div>*/
  );
};
export default page;