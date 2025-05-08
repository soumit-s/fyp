'use client'


import { z } from 'zod';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input"
import { SubmitHandler } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast';
import ErrorMessage from '@/components/ui/ErrorMessage'
import { useState } from 'react';
import axios from 'axios';

const page = () => {

    const [passwordClicked, setPasswordClick] = useState(false);
    // const router = useRouter();

    const formSchema = z.object({
        email: z.string().email("Invalid Email address"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(20, "Password must not exceed 20 characters")
            .regex(/[A-Z]/, "Must include at least one uppercase letter")
            .regex(/[a-z]/, "Must include at least one lowercase letter")
            .regex(/\d/, "Must include at least one number")
            .regex(/[@$!%*?&#]/, "Must include at least one special character"),
    })

    type FormData = z.infer<typeof formSchema>

    const { register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues,
    } = useForm<FormData>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(formSchema),
    })

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log(data)

        const response = await axios.post("http://localhost:8080/api/v1/auth/basic",{
            email:data.email,
            password:data.password, 
        })
        if(response.data.ok)
            toast.success("log in successfully ")

        console.log(response)
        reset()
    }

    return (
        <div className='w-screen h-screen flex justify-center items-center
            flex-col gap-y-10 
   '>

            <div>Log in using Email  </div>
            <form className='flex flex-col gap-y-4  w-[400px]'
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className='flex flex-col gap-y-8'>
                    <label className='flex flex-col justify-center items-center gap-x-4'>
                        <p className='text-left'>Email:</p>
                        <Input className='w-full' {...register("email")} />
                    </label>
                    <div>
                        {
                            errors.email && (<ErrorMessage message={errors.email.message} />)
                        }
                    </div>
                </div>

                <div className='flex flex-col gap-y-4'>
                    <label>
                        <p>Password </p>
                        <div className='flex gap-x-2 relative'>
                            <Input
                                type={!passwordClicked ? 'password' : 'text'}
                                {...register("password")}
                            />
                            <button type='button' className='absolute right-2 top-1 text-2xl' onClick={() => { setPasswordClick(!passwordClicked) }}>
                                {
                                    !passwordClicked && (<i className="ri-eye-off-line"></i>)
                                }
                                {
                                    passwordClicked && (<i className="ri-eye-line"></i>)
                                }
                            </button>
                        </div>
                    </label>
                    <div>
                        {
                            errors.password && (<ErrorMessage message={errors.password.message} />)
                        }
                    </div>
                </div>
                <button type='submit' className='bg-gray-800 text-white border p-2 rounded-sm'>
                    log  in
                </button>
            </form>

            {/* <div>
                <button onClick={() => {
                    router.push("/signup/mobile")
                }}
                    className='border p-2 rounded-sm'
                >
                    Another way of log in using phone number ..
                </button>
            </div> */}
        </div>

    )
}

export default page