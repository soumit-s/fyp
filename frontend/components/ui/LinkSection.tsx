'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'

const LinkSection = () => {
	const pathname = usePathname()
	const router = useRouter()

	// Split the current path into parts
	const parts = pathname.split('/').filter(Boolean)

	// Build paths like /category, /category/shoes, etc.
	const paths = parts.map((_, index) => '/' + parts.slice(0, index + 1).join('/'))

	return (
		<nav className="flex space-x-2 mb-4 text-xl">


			{parts.length > 0 && (parts.map((part, index) => (
				<span key={index} className="flex items-center space-x-2">

					<span
						onClick={() => router.push(paths[index])}
						className="text-blue-600 cursor-pointer hover:underline capitalize"
					>
						{decodeURIComponent(part)}
					</span>
					{index >= 2 && <span className="text-gray-500">on rent</span>}

					{index !== parts.length - 1 && <span>{'>'}</span>}
					
				</span>
			)))}
		</nav>
	)
}

export default LinkSection
