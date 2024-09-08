import { useAddReview } from '@/api/gigsApi'
import { useStateContext } from '@/context/StateContext'
import { UserGigsType } from '@/utils/type';
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa';

type Props = {
    gig:UserGigsType
}

const AddReviews = ({gig}:Props) => {
    const {id} = useParams()
    const [data,setData] = useState({
        reviewText:"",
        rating:0
    })
    const {setAddReview,AddReview} = useStateContext()
    const {addReview,isPending} = useAddReview(id)
    const AddReviewHandler = async()=>{
        try{
         const response = await addReview({reviewText:data.reviewText,rating:data.rating})
         console.log(response)
         setAddReview([...AddReview,response?.message])
         setData({reviewText:"",rating:0})
        }catch(error){
            console.log(error)
        }

    }
  return (
    <div className='mb-10'>
       <h3 className='text-2xl my-5 font-normal text-[#2f385a] capitalize'>
        Give {gig.createdBy.fullName} a Review
       </h3>
       <div className='flex flex-col items-start justify-start gap-3'>
       <textarea 
             name="reviewText"
             id="reviewText"
             onChange={(e)=>setData({...data,reviewText:e.target.value})}
             value={data.reviewText}
             className='block p-2.5 w-4/6 text-sm  rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
             placeholder='Add Review'
            />
        <div className='flex gap-1'>
            {
                [1,2,3,4,5].map((star)=>(
                    <FaStar
                    key={star}
                    className={`cursor-pointer ${data.rating >= star ? "text-yellow-400":"text-gray-300"}`}
                    onClick={()=>setData({...data,rating:star})}/>
                ))
            }
        </div>
            <button className='flex item bg-[#1DBF73] text-white py-2 justify-center text-md relative rounded px-5'
             onClick={AddReviewHandler} disabled={isPending}>
              {
                isPending ? "...adding review":"Add Review"
              }
            </button>
       </div>
    </div>
  )
}

export default AddReviews