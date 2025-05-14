'use client'

import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { z } from 'zod'
import axios from 'axios'
import { useRouter } from 'next/router'

const page = () => {
    const [passwordClicked, setPasswordClick] = useState(false);
    const [confirmpasswordClicked, setConfirmpasswordClicked] = useState(false)
    const router  = useRouter(); 

    const formSchema = z.object({
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(20, "Password must not exceed 20 characters")
            .regex(/[A-Z]/, "Must include at least one uppercase letter")
            .regex(/[a-z]/, "Must include at least one lowercase letter")
            .regex(/\d/, "Must include at least one number")
            .regex(/[@$!%*?&#]/, "Must include at least one special character"),
        confirmpassword: z.string()
    }).refine((data) => data.password === data.confirmpassword, {
        message: "Passwords do not match",
        path: ["confirmpassword"], // Assigns error to confirmpassword field
    })

    type FormData = z.infer<typeof formSchema>

    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            password: "",
            confirmpassword: "",
        },
        resolver: zodResolver(formSchema)
    })
    const onsubmit = async (data: FormData) => {

        console.log(data)
       
        reset()
        toast.success("Password creation succesfull")
        router.push("/login") ;
    }
    return (
        <div className='w-screen h-screen flex flex-col justify-center items-center gap-y-4'>
            <div>
                Enter password :
            </div>

            <form
                onSubmit={handleSubmit(onsubmit)}
                className='flex flex-col gap-y-3'>
                <label>
                    <p>Password </p>
                    <div className='flex gap-x-2'>
                        <Input
                            type={!passwordClicked ? 'password' : 'text'}
                            {...register("password")}
                        />
                        <button type='button' onClick={() => { setPasswordClick(!passwordClicked) }}>
                            {
                                !passwordClicked && (<i className="ri-eye-off-line"></i>)
                            }
                            {
                                passwordClicked && (<i className="ri-eye-line"></i>)
                            }
                        </button>
                    </div>
                </label>
                {
                    errors.password && (<ErrorMessage message={errors.password.message}/>)
                }
                <label>
                    <p>Confirm Password </p>
                    <div className='flex gap-x-2'>
                        <Input type={!confirmpasswordClicked ? 'password' :'text'}
                            {...register("confirmpassword")}
                        />
                        <button type='button' onClick={() => { setConfirmpasswordClicked(!confirmpasswordClicked) }}>
                            {
                                !confirmpasswordClicked && (<i className="ri-eye-off-line"></i>)
                            }
                            {
                                confirmpasswordClicked && (<i className="ri-eye-line"></i>)
                            }
                        </button>
                    </div>
                </label>
                {
                    errors.confirmpassword && (<ErrorMessage message={ errors.confirmpassword.message}/>)
                }

                <button>
                    Create Account
                </button>
            </form>


        </div>
    )
}

export default page