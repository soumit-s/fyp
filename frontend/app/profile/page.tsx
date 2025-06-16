'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form'
import * as z from 'zod';
import { DatePickerDemo } from '@/components/calender'
import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/ui/ErrorMessage";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/lib/hooks";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().max(50).optional(),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.coerce.date().refine((date) => date < new Date("2026-01-01"), "DOB must be before Jan 1, 2026"),
  address: z.string().min(1, "Address is required"),
  // phone: z.string().regex(/^[0-9]{10}$/, "Phone must be 10 digits"),
  state: z.string(),
  province: z.string(),
  country: z.string(),
  pinCode: z.number(),
});

type FormSchema = z.infer<typeof formSchema>;

const ProfilePage = () => {
  const router = useRouter();
  const profile = useUserProfile();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    values: profile.data,
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: new Date('2000-01-01'),
      address: "",
      state: "",
      province: "",
      country: "",
      pinCode: 0,
    }
  });

  const onSubmit = async (data: FormSchema) => {
    console.log(data);
    toast.success("Signed up successfully!");
    // router.push('/login');
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-2xl space-y-6">
        
        {/* Heading */}
        <h2 className="text-2xl font-bold text-black">Profile</h2>
        <div className="flex justify-center">
          <Avatar className="w-28 h-28">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* First and Middle Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Input placeholder="First Name" {...register("firstName")} />
              <ErrorMessage message={errors.firstName?.message} />
            </div>
            <div>
              <Input placeholder="Middle Name" {...register("middleName")} />
              <ErrorMessage message={errors.middleName?.message} />
            </div>
          </div>

          {/* Last Name and DOB */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Input placeholder="Last Name" {...register("lastName")} />
              <ErrorMessage message={errors.lastName?.message} />
            </div>
            <div>
              {/* <DatePickerDemo value={watch('dob')} onChange={handleDateChange} /> */}
              <ErrorMessage message={errors.dateOfBirth?.message} />
            </div>
          </div>

          {/* Phone and Email */}
          {/* Address */}
          <div>
            <Input placeholder="Address" {...register("address")} />
            <ErrorMessage message={errors.address?.message} />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-end pt-2">
            <Button type="submit" className="bg-blue-600 text-white">Save Details</Button>
            <Button type="button" variant="outline" onClick={() => reset()}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
