'use client'
import React, { useState } from 'react'
interface RentDurationProps{
	handleChange : (duration : string) => void ; 
}


const RentalDuration :React.FC<RentDurationProps> =  ({handleChange }) => {
	const [rentDuration, setrentDuration] = useState('');

	return (
		<div className='p-2' >
			<form className='flex justify-center items-center gap-2'>
				<label className='flex justify-center items-center gap-x-4'>
					<p>Choose the  Duration : </p>
					<input
						placeholder='enter the duration .. '
						name="rentDuration"
						value={rentDuration}
						className='border p-1'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setrentDuration(e.target.value)
						}}
					/>

				</label>
				<button type='submit'
				className='border p-2 rounded-full'
					onClick={(e  : React.MouseEvent<HTMLButtonElement>)=>{
							e.preventDefault() ; 
							
							handleChange(rentDuration) ; 
							setrentDuration('');
					
					}}
				>Search</button>

			</form>
		</div>
	)
}

export default RentalDuration