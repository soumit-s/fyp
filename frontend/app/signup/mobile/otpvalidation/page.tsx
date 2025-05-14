"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import toast from "react-hot-toast";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    otp: z
        .string()
        .length(6, "OTP must be exactly 6 digits")
        .regex(/^\d+$/, "OTP must contain only numbers"),
});

type FormData = z.infer<typeof formSchema>;

const Page = () => {
    const router = useRouter() ; 
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: { otp: "" },
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
        reset()
        toast.success("otp validated successfully")
        router.replace('/home') ; 

    };

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <p>Enter the OTP:</p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <Controller
                    name="otp"
                    control={control}
                    render={({ field }) => (
                        <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                                {[...Array(6)].map((_, index) => (
                                    <InputOTPSlot key={index} index={index} />
                                ))}
                            </InputOTPGroup>
                            <InputOTPSeparator />
                        </InputOTP>
                    )}
                />

                {/* Show Validation Errors */}
                {errors.otp && (<ErrorMessage message={errors.otp.message}/>)}

                <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                    Verify
                </button>
            </form>
        </div>
    );
};

export default Page;
