"use client"

import { useCheckGigOrder, useGetGigById } from '@/api/gigsApi'
import Details from '@/components/gigs/Details'
import Pricing from '@/components/gigs/Pricing'
import { useStateContext } from '@/context/StateContext'
import { checkGigOrderType, UserGigsType } from '@/utils/type'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const {id} = useParams()
    const {userInfo,setUserInfo} = useStateContext();
    const {getGigById,isLoading} = useGetGigById(id);
    const [gig,setGig] = useState<UserGigsType | null>(null)
    const {checkGigOrder} = useCheckGigOrder(id)
    const [hasUserOrderGig,setHasUserOrderGig] = useState<checkGigOrderType>()    

    useEffect(()=>{
       if(getGigById){
          setGig(getGigById.message)
       }
    },[id,getGigById])

    useEffect(()=>{
       setHasUserOrderGig(checkGigOrder?.message)
    },[id,checkGigOrder])
  return (
    <div className='grid grid-cols-3 mx-32 gap-20'>
       <Details gig={gig} hasOrderGig={hasUserOrderGig} />
       <Pricing gig={gig}/>
    </div>
  )
}

export default Page