'use client'


import {z} from 'zod';
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input"
import {SubmitHandler} from 'react-hook-form'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import ErrorMessage from '@/components/ui/ErrorMessage'

const page = () => {

    const router = useRouter() ; 

    const formSchema=z.object({
        email: z.string().email("Invalid Email address"),
        terms: z.boolean().refine((val) => val === true, {
            message: "You must accept the terms and conditions",
          }),
    })

    type FormData = z.infer<typeof formSchema>

    const {register,
        handleSubmit,
        formState :{errors},
        reset , 
    } = useForm<FormData>({
        defaultValues:{
            email: "",
            terms:false,
        },
        resolver:zodResolver(formSchema) , 
    })

    const onSubmit:SubmitHandler<FormData> =(data)=>{
        toast.success("Link succesfully sent to your email")
        console.log(data)
        reset()
    }

  return (
   <div className='w-screen h-screen flex justify-center items-center
            flex-col gap-y-10 
   '>
        
        <div>Email based signup</div>
        <form className='flex flex-col gap-y-4 '
            onSubmit={handleSubmit(onSubmit)}
        >
            <label className='flex flex-col justify-center items-center gap-x-4 '>
                <p className='text-left'>Email:</p>
                <Input className='w-[200px]' {...register("email")}/>
            </label>
            {
                errors.email && (<ErrorMessage message={errors.email.message} />)
            }

            <label className='flex gap-x-4'>
                <input type='checkbox' {...register("terms")} />
                <p> Terms & conditions </p>
            </label>
            {
                errors.terms && (<ErrorMessage message={ errors.terms.message}/>)
            }
            <button type='submit' className='border p-2 rounded-sm'>
                Sign in 
            </button>
        </form>

        <div>
            <button onClick={()=>{
                router.push("/signup/mobile")
            }}
            className='border p-2 rounded-sm'
            >
                Another way of sign in using phone number .. 
            </button>
        </div>
   </div>

  )
}

export default page