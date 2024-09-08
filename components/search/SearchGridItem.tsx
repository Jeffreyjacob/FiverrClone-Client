
import { SearchUserGigsType } from '@/utils/type'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaStar } from 'react-icons/fa'

type Props = {
    gig:SearchUserGigsType
}

const SearchGridItem = ({gig}:Props) => {
    const router  = useRouter()

    const calculateRating = ()=>{

    }
  return (
    <div className='max-w-[300px] flex flex-col gap-2 p-1 cursor-pointer mb-8'
    onClick={()=> router.push(`/gig/${gig.id}`)}>
       <div className='relative w-64 h-40'>
           <Image src={gig.images[0]}
            fill className='rounded-xl' alt="gig"/>
       </div>
        <div className='flex items-center gap-2'>
             <div>
                {
                    gig.createdBy.profileImage ? (
                     <Image src={gig.createdBy.profileImage}
                     height={30}
                     alt='profile-image'
                     width={30}
                     className='rounded-full'/>
                    ):(
                      <div className='bg-purple-500 h-7 w-7 flex items-center justify-center rounded-full relative'>
                        <span className='text-lg text-white'>
                           {gig.createdBy.email[0].toUpperCase()}
                        </span>
                      </div>
                    )
                }
             </div>
              <span className='text-md'>
                <strong className='font-medium'>{gig.createdBy.username}</strong>
              </span>
        </div>
         <div>
            <p className='line-clamp-2 text-[#404145]'>{gig.title}</p>
         </div>
         <div className='flex items-center gap-1 text-yellow-600'>
            <FaStar/>
             <span className='font-medium'>
                 {/* {calculateRating()} */}
            </span>      
         </div>
         <div>
            <strong className='font-medium'>from ${gig.price}</strong>
         </div>
    </div>
  )
}

export default SearchGridItem