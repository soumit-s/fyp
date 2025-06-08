'use client'

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import axios from 'axios';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: any) => {
    const response = await axios.post("http://localhost:8080/api/v1/auth/basic", data);
    if (response.data.ok) {
      router.push("/home");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow w-96 space-y-4">
        <h2 className="text-2xl font-semibold text-center">Account Login</h2>

        <Input placeholder="Email" {...register("email")} />
        {typeof errors.email?.message === 'string' && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <Input type="password" placeholder="Password" {...register("password")} />
        {typeof errors.password?.message === 'string' && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <div className="flex justify-between text-sm">
          <label className="flex items-center space-x-2">
            <input type="checkbox" />
            <span>Remember me</span>
          </label>
          <Link href="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</Link>
        </div>

        <button type="submit" className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700">Login</button>
        <p className="text-sm text-center">New user? <Link href="/profile" className="text-blue-600 underline">Create Account</Link></p>
      </form>
    </div>
  );
}
