"use client"

import { useConfirmPayment } from '@/api/orderApi';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'

const Page = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const paymentIntent = searchParams.get("payment_intent") as string;
    const {confirmPayment,isPending} = useConfirmPayment()
    console.log(paymentIntent)
    
    useEffect(()=>{
      if(paymentIntent){
        const changePaymentStatus = async()=>{
            try{
             const response = await confirmPayment({payment_intent:paymentIntent})
             console.log(response)
             if(response.message === "payment confirmed successFully!"){
                setTimeout(()=>{
                  router.push("/buyer/orders")
                },5000)
             }

            }catch(error){
                console.log(error)
            }
       }
       changePaymentStatus()
      }
    },[paymentIntent])
  return (
    <div className='h-[80vh] flex items-center px-20 pt-20 flex-col'>
        <h1 className='text-4xl text-center'>
             Payment successful. You are being redirected to the order page.
        </h1>
        <h1 className='text-4xl text-center'>
            Please do not close the page
        </h1>
    </div>
  )
}

export default Page