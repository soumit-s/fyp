"use client"


import { z } from 'zod';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input"
import { SubmitHandler } from 'react-hook-form'
import { useState } from 'react';

import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import ErrorMessage from '@/components/ui/ErrorMessage';




const page = () => {

    const router = useRouter();
    
    const formSchema = z.object({
        phone: z
            .string()
            .min(10, "Phone number must be at least 10 digits")
            .max(15, "Phone number must not exceed 15 digits")
            .regex(/^\d+$/, "Phone number must contain only digits"),

    })

    type FormData = z.infer<typeof formSchema>

    const { register,
        getValues,
        handleSubmit,
        formState: { errors },
        reset,
        getFieldState,
    } = useForm<FormData>({
        defaultValues: {
            phone: "",
        },
        resolver: zodResolver(formSchema),
    })

    const onSubmit: SubmitHandler<FormData> = (data) => {

        console.log(data)
        reset()
        toast.success("Otp geberated")
        router.push("/signup/mobile/otpvalidation")
        
    }

    return (
        <div className='w-screen h-screen flex justify-center items-center
            flex-col gap-y-10 
   '>

            <div>Phone number based signup</div>
            <form className='flex flex-col gap-y-4 '
                onSubmit={handleSubmit(onSubmit)}
            >
                <label className='flex flex-col justify-center items-center gap-x-4 '>
                    <p className='text-left'>phone number:</p>
                    <Input className='w-[200px]' {...register("phone")} />
                </label>
                {
                    errors.phone && (<ErrorMessage message={errors.phone.message}/>)
                }



                <button
                    onClick={() => {
                       
                    }}
                    disabled={getFieldState("phone").invalid} // Disable if phone is invalid or empty
                >verify</button>


                
            </form>

            <div>
            <button onClick={()=>{
                router.push("/signup")
            }} className='border p-2 rounded-sm '>
                Another way of sign in using Email .. 
            </button>
        </div>
        </div>

    )
}

export default page