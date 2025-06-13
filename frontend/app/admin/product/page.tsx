import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod"

const productSchema = z.object({
	name: z.string(),
	description: z.string(),
	rate: z.number().min(0),
});

type ProductSchema = z.infer<typeof productSchema>;

export default function CreateProductPage() {
	const { control, register, handleSubmit } = useForm<ProductSchema>({ resolver: zodResolver(productSchema) });
	const onSubmit: SubmitHandler<ProductSchema> = (data) => {};
	
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input {...register("name")} />
				<input {...register("description")} />
				<input type="number" {...register("rate")} />
			</form>
		</div>
	)
}