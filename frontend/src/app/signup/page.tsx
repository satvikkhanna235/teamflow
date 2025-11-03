'use client';
import { useForm } from 'react-hook-form';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await api.post('/auth/signup', data);
      alert('Signup successful!');
      router.push('/login');
    } catch (err: any) {
      alert('Signup failed: ' + err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 p-6 rounded-lg w-80">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        <input {...register('name')} placeholder="Name" className="w-full p-2 mb-2 text-black" required />
        <input {...register('email')} placeholder="Email" type="email" className="w-full p-2 mb-2 text-black" required />
        <input {...register('password')} placeholder="Password" type="password" className="w-full p-2 mb-4 text-black" required />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 w-full py-2 rounded">Sign Up</button>
      </form>
    </div>
  );
}
