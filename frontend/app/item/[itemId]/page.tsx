'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import data from '../../data';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '../../../components/ui/ErrorMessage';
import toast from 'react-hot-toast';
import Rating from '@mui/material/Rating';
import ItemCard from '@/components/ui/ItemCard';

interface ItemDetails {
	imgUrl: string[];
	name: string;
	ratings: string;
	specs: string;
	price: string;
}
interface SimilarItem {
	imgUrl: string[];
	name: string;
	price: string;
}
const { obj1, similarItem } = data;

const page = ({ params }: { params: { itemId: string } }) => {
	// console.log(obj1) ; 
	const { itemId } = React.use(params);
	// console.log(itemId)


	// db call to fetch item details from DB based on itemId; 
	// let obj = DB call  ;
	const [urlImg, setUrlImg] = useState<string>(obj1?.imgUrl[0]);

	const [itemDetails, setitemDetails] = useState<ItemDetails>({
		imgUrl: [],
		name: "",
		ratings: "",
		specs: "",
		price: "",
	});

	useEffect(() => {
		const fetchDetails = () => {
			toast('ID changed to ' + itemId);
			// api call to fetch item details based on itemId
			let { imgUrl, name, rating, specs, price } = obj1;
			let ratings = rating.toString();
			setitemDetails({ imgUrl, name, ratings, specs, price });
			console.log(rating);
		}
		fetchDetails();
		console.log(obj1);
	}, [itemId]);

	const [imgIndex, setImgIndex] = useState(0);
	let n = itemDetails.imgUrl.length;

	const handleRightArrowClick = () => {
		// Logic to handle right arrow click
		// console.log("Right arrow clicked");
		let newIndex = (imgIndex + 1) % n;
		setImgIndex(newIndex);
		setUrlImg(itemDetails.imgUrl[newIndex]);
		// console.log("img setted , next index ->" , newIndex )
	}
	const handleLeftArrowClick = () => {
		// Logic to handle right arrow click
		// console.log("Left arrow clicked");
		let newIndex = imgIndex - 1 >= 0 ? imgIndex - 1 : n - 1;
		setImgIndex(newIndex);
		setUrlImg(itemDetails.imgUrl[newIndex]);
		// console.log("img setted ->" , newIndex )
	}
	const formSchema = z.object({
		pincode: z.preprocess(
			(val) => (typeof val === 'string' || typeof val === 'number') ? Number(val) : undefined,
			z
				.number({
					required_error: 'Pincode is required',
					invalid_type_error: 'Pincode must be a number',
				})
				.int()
				.min(100000, 'Pincode must be at least 6 digits')
				.max(999999, 'Pincode must be at most 6 digits')
		),
	});

	type FormSchema = z.infer<typeof formSchema>;
	const { register, handleSubmit, reset, formState: { errors } } = useForm<FormSchema>({
		defaultValues: {
			pincode: undefined,
		},
		resolver: zodResolver(formSchema)
	})
	const submitHandler = async (data: FormSchema) => {
		console.log("pincode", data.pincode)
		// api call backkend-> check pincode
		reset();
	}
	const handleAddToWishlist = () => {
		// api call to add to wishlist ->id :: itemId
		toast.success("Added to wishlist")
	}
	const handleAddToCart = () => {
		// api call to add to cart -> id :: itemId 
		toast.success("Added to cart")
	}
	const handleRentNow = () => {
		// api call to rent now -> id :: itemId
		toast("moved to buy now page")
	}
	//Similar item load 
	const [similarItems, setSimilarItems] = useState<SimilarItem[]>([]);
	useEffect(() => {
		// api call to get similar items based on itemId
		setSimilarItems(similarItem);

	}, [itemId])



	return (
		<div className='w-[100vw] h-[100vh] flex flex-col '>
			<div className='w-[100vw] flex mx-auto  p-10 gap-x-10 h-[60%] '>
				{/* left */}
				<div className='w-[50%]  p-4  relative' >

					<div className='border h-full w-[92%] mx-auto overflow-hidden rounded-2xl'>
						<img src={urlImg} className='w-full h-full' />
					</div>
					{/* right  */}
					<button className='hover:cursor-pointer absolute right-0 top-[35%]' onClick={handleRightArrowClick}>
						<i className="ri-arrow-right-circle-fill text-[3rem] absolute right-0 top-[35%] " ></i>
					</button>
					{/* left */}
					<button className='hover:cursor-pointer border absolute left-0 top-[35%]' onClick={handleLeftArrowClick}>
						<i className="ri-arrow-left-circle-fill text-[3rem] absolute left-0 top-[35%]" ></i>
					</button>
				</div>
				{/* right */}
				<div className='w-[40%] flex flex-col justify-center items-center gap-y-6'>
					<div> {itemDetails.name}   </div>
					<div>
						{
							<Rating
								name="read-only"
								value={parseFloat(itemDetails.ratings)}
								precision={0.5}
								readOnly
							/>
						}
						<div> {itemDetails.specs}  </div>
						<div> price :: {itemDetails.price}</div>
					</div>
					<div>
						{/* delivery date call */}
						<form onSubmit={handleSubmit(submitHandler)}>
							<div className='flex gap-x-2'>
								<label className='flex gap-x-4 justify-center items-center'>
									<p className='text-left'>Check delivery date</p>
									<input type="number" className='border border-black' {...register("pincode")} />
								</label>
								<button type='submit' className='border p-2' >
									<p className='text-left'>Check</p>
								</button>
							</div>
							<div>
								{
									errors.pincode && (<ErrorMessage message={errors.pincode.message} />)
								}
							</div>
						</form>

						<div>{ /* delivery Date */}</div>
					</div>
					<div className='w-full flex justify-evenly gap-x-4 mx-auto'>
						<button onClick={handleAddToWishlist} className='border p-2 rounded-sm w-[40%]'> Add to Wishlist </button>
						<button onClick={handleAddToCart} className='border p-2 rounded-sm w-[40%]' > Add to Cart </button>
					</div>
					<div className='w-full'>
						<button onClick={handleRentNow} className='border p-2 rounded-sm w-full'>Rent Now</button>
					</div>
				</div>
			</div>

			{/* similar items  */}
			<div className='p-2 w-[100vw] h-[40%] relative'>
				<div className='p-4 mx-auto flex w-[95%]  h-full gap-x-10 overflow-x-scroll'>
					{
						similarItems.length > 0 && (
							similarItems.map((item, index) => {
								// ** fix ::  add item id in schema and pass it to item card
								return (<ItemCard key={index} item = {item} />)
							}
							)
						)
					}
				</div>
			</div>

		</div>
	)
}

export default page