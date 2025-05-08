import { useRouter } from 'next/navigation'
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


  const handleView = () => {
    const randomId = Math.floor(Math.random() * 1000);
    // it will be updated with clicked item id 
    toast('moved to another obj with random id ');
    router.replace(`/item/${randomId}`);
  }






  return (
    <div className='flex flex-col border rounded-2xl p-2  min-w-[20rem] '>
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