"use client";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signinUser, signupUser } from "@/lib/utils";
import { useAuthStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

const formSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must not exceed 20 characters")
      .regex(/[A-Z]/, "Must include at least one uppercase letter")
      .regex(/[a-z]/, "Must include at least one lowercase letter")
      .regex(/\d/, "Must include at least one number")
      .regex(/[@$!%*?&#]/, "Must include at least one special character"),
    confirmpassword: z.string(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"], // Assigns error to confirmpassword field
  });

type FormData = z.infer<typeof formSchema>;

const page = () => {
  const [passwordClicked, setPasswordClick] = useState(false);
  const [confirmpasswordClicked, setConfirmpasswordClicked] = useState(false);
  const router = useRouter();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmpassword: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onsubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const body = {
        email: data.email,
        password: data.password,
      };
      if (!(await signupUser(body))) {
        toast.error("Something went wrong :(");
        return;
      }
      // Fetch the token and sign in the user.
      const token = await signinUser(body);
      if (!token) {
        toast.error("Credentials donot match");
        return;
      }
      setAccessToken(token);
      reset();
      router.push("/home");
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-y-4">
      <div>Enter password :</div>

      <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-y-3">
        <label>
          <p>Password </p>
          <div className="flex gap-x-2">
            <Input
              type={!passwordClicked ? "password" : "text"}
              {...register("password")}
            />
            <Button
              type="button"
              onClick={() => {
                setPasswordClick(!passwordClicked);
              }}
            >
              {!passwordClicked && <i className="ri-eye-off-line"></i>}
              {passwordClicked && <i className="ri-eye-line"></i>}
            </Button>
          </div>
        </label>
        {errors.password && <ErrorMessage message={errors.password.message} />}
        <label>
          <p>Confirm Password </p>
          <div className="flex gap-x-2">
            <Input
              type={!confirmpasswordClicked ? "password" : "text"}
              {...register("confirmpassword")}
            />
            <Button
              type="button"
              onClick={() => {
                setConfirmpasswordClicked(!confirmpasswordClicked);
              }}
            >
              {!confirmpasswordClicked && <i className="ri-eye-off-line"></i>}
              {confirmpasswordClicked && <i className="ri-eye-line"></i>}
            </Button>
          </div>
        </label>
        {errors.confirmpassword && (
          <ErrorMessage message={errors.confirmpassword.message} />
        )}

        <Button type="submit" className="flex items-center gap-2">
          {submitting && <Loader2Icon className="animate-spin" />}
          Create Account</Button>
      </form>
    </div>
  );
};

export default page;
