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



const UserProfile = ({ params }: { params: { userId: string } }) => {
	const userId = params;  // userId from url
	//  console.log(params)
	// const [isEditable, setIseditable] = useState(false);


	const formSchema = z.object({
		firstName: z.string().min(1, "First name cannot be empty").max(50, "First name is too long"),  // Ensure valid first name 
		middleName: z.string().max(50, "Middle name is too long").optional(), // Ensure valid Middle name 
		lastName: z.string().min(1, "Last name cannot be empty").max(50, "Last name is too long"), // Ensure Last name 
		dob: z.coerce.date().refine((date) => {
			const cutoffDate = new Date("2026-01-01"); // LET ,DOB must be before Jan 1, 2006
			return date < cutoffDate;
		}, "DOB must be before Jan 1, 2026"),
		address: z.string().min(1, "Address cannot be empty").max(200, "Address is too long"),
		phone: z.string()
			.regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"), // Ensures 10-digit numeric input
		email: z.string().email("Invalid email format") // Ensures valid email format
	});


	type formSchema = z.infer<typeof formSchema>

	const {
		register,
		handleSubmit,
		reset,
		watch,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			firstName: "akhdssd",
			middleName: "djkasd",
			lastName: "jjdd",
			dob: new Date('2023-01-01'),
			address: "jdkksldmcncnsdsdka fakdndnksdf kdfd",
			phone: "8888888888",
			email: "soummojitcha@gmail.com"
		},
		resolver: zodResolver(formSchema),
	})

	const onSubmit = (data: formSchema) => {

		console.log("submitted")
		console.log(data)
		toast.success('All changes are saved')
		// reset();
		// setIseditable((prev) => (!prev))
	}
	const handleDateChange = (dob?: Date) => {
		if (dob) {
			console.log(dob)
			setValue("dob", dob)
		}
	}
	const handleCancling = () => {
		toast('All values set to default ')
		reset()
		// setIseditable((prev)=>(!prev))
	}

	return (
		<div>

			<div className='w-[80%] border border-black h-screen mx-auto text-black'>
				<div>
					<Avatar className="w-[14rem] h-[14rem]">
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>

					<form onSubmit={handleSubmit(onSubmit)}>
						<div>
							<div>
								<Input placeholder="First Name" className="placeholder:text-grey-900"

									{...register("firstName")} />
								<ErrorMessage message={errors.firstName?.message} />
							</div>
							<div>
								<Input placeholder="Middle name " className="placeholder:text-grey-900"{...register("middleName")}  />
								<ErrorMessage message={errors.middleName?.message} />
							</div>
							<div>
								<Input placeholder="Last name " className="placeholder:text-grey-900"{...register("lastName")}  />
								<ErrorMessage message={errors.lastName?.message} />
							</div>
						</div>
						<div>
							<div >
								<p>DOB :</p>
								<DatePickerDemo value={watch('dob')} onChange={handleDateChange} />
							</div>
							<div>
								<Input {...register('phone')} />
								<ErrorMessage message={errors.phone?.message} />
							</div>

							<div>
								<Input {...register('email')} />
								<ErrorMessage message={errors.email?.message} />
							</div>

						</div>
						<div>
							<Input {...register('address')} />
							<ErrorMessage message={errors.address?.message} />
						</div>

						<div className="flex gap-x-4">
							{
								(<Button type="submit" className="text-white">Save Details </Button>)
							}
							{
								(<Button type="button" className="text-white" onClick={handleCancling}>Cancel Editing </Button>)
							}
						</div>
					</form>
				</div>



			</div>

		</div>
	)
}

export default UserProfile