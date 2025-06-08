import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast';

type ItemCardProps = {
  item: {
    imgUrl: string[];
    name: string;
    price: string;
  }

}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {

  const router = useRouter();
  const pathName  = usePathname() ; 

  const handleView = () => {
    const randomId = Math.floor(Math.random() * 1000);
    toast('Moved to another object with random ID');
  
    const arr = pathName.split('/').filter(Boolean); // remove leading ''
  
    // console.log('Original path:', arr);
  
    // Example assumption: /category/[categoryId]/[itemId]/somethinategory-5g
    // If the ID to replace is at index 2 (third part)
    if (arr.length >= 2) {
      arr[2] = String(randomId); // Replace the 3rd segment with the random ID
    }
  
    const newPath = '/' + arr.join('/');
    // console.log('New path:', newPath);
  
    router.push(newPath);
  };
  


  return (
    <div className='flex flex-col border rounded-2xl p-2  min-w-[20rem] max-w-[25rem]'>
      <div className='w-full h-full  flex flex-col
      '>
        <div className=''>
          {
            item.imgUrl.length > 0 &&
            (<img src={item.imgUrl[0]} className='rounded-xl' />)
          }
        </div>

        <div className='text-xl flex flex-col justify-center items-center gap-y-3 '>
          <div className='flex flex-col gap-y-2 justify-center items-center'>
            <div> {item.name} </div>
            <div> {item.price} </div>
          </div>
          <button onClick={handleView} className='border px-4 py-2 rounded-xl '>
            <p> View </p>
          </button>
        </div>


      </div>

    </div>
  )
}

export default ItemCard