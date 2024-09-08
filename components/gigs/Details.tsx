import { checkGigOrderType, UserGigsType } from '@/utils/type'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import Reviews from './Reviews'
import AddReviews from '../addReviews'

type Props = {
    gig: UserGigsType | null
    hasOrderGig:checkGigOrderType | undefined
}

const Details = ({ gig,hasOrderGig}: Props) => {
    const [currentImage, setCurrentImage] = useState("")
    console.log(currentImage)

    useEffect(() => {
        if (gig) {
            setCurrentImage(gig.images[0])
        }
    }, [gig])
    return (
        <>
            {
                gig && (
                    <div className='col-span-2 flex flex-col gap-3 mt-32 mb-20'>
                        <h2 className='text-2xl font-bold text-[#404145] mb-1'>
                            {gig.title}
                        </h2>
                        <div className='flex items-center gap-2'>
                            <div>
                                {
                                    gig.createdBy.profileImage ? (
                                        <Image
                                            src={gig.createdBy.profileImage}
                                            alt='profile-image'
                                            height={30}
                                            width={30}
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
                            <div className='flex gap-2 items-center'>
                                <h4 className='text-[#27272a] font-bold'>{gig.createdBy.fullName}</h4>
                            </div>
                            <div className='flex items-center gap-1'>
                                <div className='flex'>
                                    {
                                        [1, 2, 3, 4, 5].map((star) => (
                                            <FaStar key={star}
                                            // className={`cursor-pointer ${Math.ceil(averageRating) >= star ? "text-yellow-400":"text-gray-300"}`}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-4'>
                            <div className='mx-h-[1000px] max-w-[1000px] overflow-hidden'>
                                <Image
                                    src={currentImage}
                                    alt='gig'
                                    height={1000}
                                    width={1000}
                                    className='hover:scale-110 transition-all duration-500'
                                />
                            </div>
                            <div className='flex gap-4 flex-wrap'>
                                {
                                    gig.images.length > 1 && gig.images.map((image) => (
                                        <Image
                                            src={image}
                                            alt='gig'
                                            height={100}
                                            width={100}
                                            key={image}
                                            onClick={() => setCurrentImage(image)}
                                            className={`${currentImage === image ? "" : "blur-sm"} cursor-pointer transition-all duration-500`}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                        <div>
                            <h3 className='text-3xl my-5 font-medium text-[#404145]'>
                                About this gig
                            </h3>
                            <div>
                                <p>{gig.description}</p>
                            </div>
                            <div>
                                <h3 className='text-3xl my-5 font-medium text-[#404145]'>
                                    About the Seller
                                </h3>
                                <div className='flex gap-4'>
                                    <div>
                                        {gig.createdBy.profileImage ? (
                                            <Image
                                                src={gig.createdBy.profileImage}
                                                alt='profile-image'
                                                height={120}
                                                width={120}
                                                className='rounded-full'
                                            />
                                        ) : (
                                            <div className='bg-purple-500 h-7 w-7 flex items-center justify-center rounded-full relative'>
                                                <span className='text-lg text-white'>
                                                    {gig.createdBy.email[0].toUpperCase()}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <div className='flex gap-2 items-center'>
                                            <h4 className='font-medium text-lg'>
                                                {gig.createdBy.fullName}
                                            </h4>
                                            <span className='text-[#74747e]'>
                                              @{gig.createdBy.username}
                                            </span>
                                        </div>
                                        <div>
                                            <p>{gig.createdBy.description}</p>
                                        </div>
                                         <div className='flex text-yellow-500'>
                                            {
                                            [1,2,3,4,5].map((star)=>(
                                                <FaStar key={star}
                                                className=''/>
                                            ))
                                            }
                                         </div>
                                         <span className='text-yellow-500'>
                                            
                                         </span>
                                         <span className='text-[#74747e]'>
                                          
                                         </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Reviews gig={gig}/>
                        {
                            hasOrderGig && <AddReviews gig={gig}/>
                        }
                    </div>
                )
            }
        </>
    )
}

export default Details