import { useStateContext } from '@/context/StateContext'
import { UserGigsType } from '@/utils/type'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'

type Props = {
    gig: UserGigsType
}

const Reviews = ({ gig }: Props) => {
    const { setAddReview, AddReview } = useStateContext()
    const [avarageRating, setAvarageRatings] = useState(0)
    useEffect(() => {
        setAddReview(gig.reviews)
        if (AddReview.length) {
            let avgRating = 0;
            AddReview.forEach(({ rating }) => (avgRating += rating))
            setAvarageRatings((avgRating / AddReview.length));
        }
    }, [gig, setAddReview])
    console.log(AddReview)
    return (
        <div>
            {
                AddReview.length > 0 && (
                    <div className='mb-10'>
                        <h3 className='text-2xl my-5 font-normal text-[#404145]'>
                            Reviews
                        </h3>
                        <div className='flex gap-3 mb-5'>
                            <h5>{AddReview.length} reviews for this Gig</h5>
                            <div className='flex text-yellow-500 items-center gap-2'>
                                <div className='flex gap-2'>
                                    {
                                        [1, 2, 3, 4, 5].map((star) => (
                                            <FaStar
                                                key={star}
                                                className={`cursor-pointer ${Math.ceil(avarageRating) >= star ? "text-yellow-400" : "text-gray-300"}`}
                                            />))
                                    }
                                </div>
                                <span>{avarageRating}</span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-6'>
                            {
                              AddReview.map((review)=>(
                                <div className='flex gap-3 border-t pt-6' key={review.id}>
                                   <div>
                                    {
                                        review.reviewer.profileImage ? (
                                            <Image
                                                src={review.reviewer.profileImage}
                                                alt='profile-image'
                                                height={40}
                                                width={40}
                                                className='rounded-full'
                                            />
                                        ) : (
                                            <div className='bg-purple-500 h-7 w-7 flex items-center justify-center rounded-full relative'>
                                                <span className='text-lg text-white'>
                                                    {gig.createdBy.email[0].toUpperCase()}
                                                </span>
                                            </div>
                                        )
                                    }

                                   </div>
                                   <div className='flex flex-col gap-2'>
                                      <h4>{review.reviewer.fullName}</h4>
                                      <div className='flex text-yellow-500 items-center gap-2'>
                                          <div className='flex gap-1'>
                                                 {
                                                    [1,2,3,4,5].map((star)=>(
                                                        <FaStar key={star}
                                                         className={`cursor-pointer ${review.rating >= star ? "text-yellow-400":"text-gray-300"}`}
                                                        />
                                                    ))
                                                 }
                                          </div>
                                          <span>{review.rating}</span>
                                      </div>
                                      <p className='text-[#404145]'>{review.reviewText}</p>
                                   </div>
                                </div>
                              ))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Reviews