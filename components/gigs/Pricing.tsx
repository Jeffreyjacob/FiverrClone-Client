
import { useStateContext } from '@/context/StateContext'
import { UserGigsType } from '@/utils/type'
import { useRouter } from 'next/navigation';
import React from 'react';
import { BiRightArrowAlt } from 'react-icons/bi';
import { BsCheckLg } from 'react-icons/bs';
import { FiClock, FiRefreshCw } from 'react-icons/fi';


type Props = {
    gig: UserGigsType | null
}

const Pricing = ({ gig }: Props) => {
    const router = useRouter();
    const { userInfo } = useStateContext()
    return (
        <div className='mt-32'>
            {gig && <div className='sticky top-36 mb-10 h-max w-96'>
                <div className='border p-10 flex flex-col gap-5'>
                    <div className='flex justify-between'>
                        <h4 className='text-md font-normal text-[#74767e]'>
                            {gig.shortDesc}
                        </h4>
                        <h6 className='font-medium text-lg'>${gig.price}</h6>
                    </div>
                    <div>
                         <div className='text-[#62646a] font-semibold text-sm flex gap-6'>
                            <div className='flex items-center gap-2'>
                                <FiClock className='text-xl'/>
                                <span>{gig.deliveryTime} Days Delivery</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                 <FiRefreshCw className='text-xl'/>
                                 <span>{gig.revision}</span>
                            </div>
                         </div>
                    </div>
                     <ul> 
                        {
                            gig.features.map((feature)=>(
                              <li className='flex items-center gap-3' key={feature}>
                                 <BsCheckLg className='text-[#1DBF73] text-lg'/>
                                 <span className='text-[#4f5156]'>
                                    {feature}
                                 </span>
                              </li>
                            ))
                        }
                     </ul>

                     {
                            gig.userId === userInfo?.id ? (
                                <button 
                                 className='flex items-center bg-[#1DBF73] text-white py-2 justify-center font-bold text-lg relative rounded'
                                 onClick={()=> router.push(`/seller/gigs/${gig.id}`)}>
                                   <span>Edit</span>
                                   <BiRightArrowAlt className='text-2xl absolute right-4'/>
                                </button>
                            ):(
                                <button 
                                 className='flex items-center bg-[#1DBF73] text-white py-2 justify-center font-bold text-lg relative rounded'
                                 onClick={()=>router.push(`/checkout?gigId=${gig.id}`)}>
                                  <span>Continue</span>
                                  <BiRightArrowAlt className='text-2xl absolute right-4'/>
                                </button>
                            )
                         }
                </div>
                   {
                    gig.userId !== userInfo?.id && (
                        <div className='flex items-center justify-center mt-5'>
                           <button className='w-5/6 hover:bg-[#74767e] py-1 border border-[#74747e] px-5 text-[#6c6d75] hover:text-white transition-all duration-300 text-lg rounded font-bold'>
                              Contact Me
                           </button>
                        </div>
                    )
                   }
            </div>
            }
        </div>
    )
}

export default Pricing