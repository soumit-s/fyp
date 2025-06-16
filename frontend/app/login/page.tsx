"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import axios from "axios";
import { signinUser } from "@/lib/utils";
import toast from "react-hot-toast";
import { useAuthStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function LoginPage() {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: any) => {
    setSubmitting(true);
    try {
      const token = await signinUser(data);
      console.log(token);
      if (!token) {
        toast.error("Credentials donot match");
        return;
      }
      setAccessToken(token);
      router.push("/home");
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  // Redirects to home if user is already logged in
  useEffect(() => {
    if (accessToken) {
      router.push("/home");
    }
  }, [accessToken])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow w-96 space-y-4"
        aria-disabled={submitting}
      >
        <h2 className="text-2xl font-semibold text-center">Account Login</h2>

        <Input placeholder="Email" {...register("email")} />
        {typeof errors.email?.message === "string" && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {typeof errors.password?.message === "string" && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <div className="flex justify-between text-sm">
          <label className="flex items-center space-x-2">
            <input type="checkbox" />
            <span>Remember me</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-blue-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting && <Loader2 color="white" className="animate-spin" />}
          Login
        </Button>
        <p className="text-sm text-center">
          New user?{" "}
          <Link href="/profile" className="text-blue-600 underline">
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
}
