'use client'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation';

interface CategoriesType{
	id : string  ,
	name : string 
}
interface Categories {
	cat : CategoriesType , 
}

const Category = ({ cat  } : Categories  ) => {

	const router = useRouter();
	const pathName  = usePathname() ; 
	// console.log(cat) ; 
	const handleCategoryClick = (categoryId: string) => {
		router.push(pathName+`/${categoryId}`);
	};
	return (
		<div
			key={cat.id}
			onClick={() => handleCategoryClick(cat.id)}
			className="cursor-pointer border rounded-2xl p-6 text-center shadow hover:shadow-lg transition"
		>
			<h3 className="text-lg font-semibold">{cat.name} </h3>
		</div>
	)
}

export default Category