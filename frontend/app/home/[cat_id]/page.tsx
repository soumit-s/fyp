'use client'
import Navbar from '@/components/ui/navbar'
import React, { useEffect, useState } from 'react'
import data from '../../data';
import ItemCard from '@/components/ui/ItemCard';
import RentalDuration from '@/components/ui/RentalDuration';
import LinkSection from '@/components/ui/LinkSection';

interface Items{
	name: string ,
	price : string ,
	duration : string , 
	imgUrl : string[] , 
}

const page = () => {

	const {similarItem }  = data ; 
	const [displayItem , setDisplayItem] = useState<Items[]>([]) ; 
	const [isLoading , setLoading ] = useState(false) ; 

	const handleRentDuration = (duration : string )=>{
		setLoading(true) ; 
		const resArray = similarItem.filter((item)=>{
			if(parseInt(item.duration) >= parseInt(duration))
				return true ; 
			return false ; 
		})
		setDisplayItem(resArray) ;
		console.log(resArray) ;
		
		setLoading(false) ; 

	}
	
	const handleSearch = (query: string) => {
		setLoading(true) ; 
		const resArray = similarItem.filter((item)=>{
			let name  = item.name.toLowerCase() ; 
			if(name.includes(query.toLowerCase()))
				return true ; 
			return false ; 
		})
		console.log(resArray) ; 
		setDisplayItem(resArray) ; 
		setLoading(false) ; 
	}
	useEffect(()=>{
		setDisplayItem(similarItem) ; 
		console.log(similarItem) ; 

	} , [similarItem])

	return (
		<div className='w-full flex flex-col'>
			<Navbar onSearch={handleSearch} />
			<LinkSection />
			<div className='border w-full relative'>
				<RentalDuration handleChange={handleRentDuration} />
			</div>
			<div className='mx-auto p-2  grid grid-cols-4 
				gap-4
			' >
				{
					isLoading ? <div className='font-bold text-4xl'>Loading ... </div> :( displayItem.length>0 && (
						displayItem.map((item , index)=>{
							return ( <ItemCard  key ={index} item ={item} /> )
						})
					))
				}
			</div>
		</div>
	)
}

export default page