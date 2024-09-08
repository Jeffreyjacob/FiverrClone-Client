"use client"
import { useCreateOrder } from '@/api/orderApi';
import CheckoutForm from '@/components/checkoutForm/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import { StripeElementsOptions } from '@stripe/stripe-js';

const Page = () => {
    const searchParams = useSearchParams();
    const gigId = searchParams.get("gigId") as string
    const {createOrder,isPending} = useCreateOrder()
    const [clientSecret,setclientSecret] = useState("") 
    const [dpmCheckerLink, setDpmCheckerLink] = useState("");
    const stripePromise = loadStripe("pk_test_51P90At05AUDEDgY6WlTKdEfQTpodrZdrF8mQQVvkcPKS0EZExLMZIQrFd9O8d47b09Khf7YoS864h12IW6Tnaeq800gemVdNXi")
    useEffect(()=>{
      if(gigId){
        const order = async ()=>{
            try{
             const response = await createOrder({gigId:gigId})
             setclientSecret(response.clientSecret)
             setDpmCheckerLink(response.dpmCheckerLink)
            }catch(error){
               console.log(error)
            }
        }
        order()
      }
    },[gigId])
    console.log(clientSecret)
    console.log(dpmCheckerLink)

    const appearance = {
        theme: "stripe" as "stripe" | "night" | "flat", // Must be one of these options
    }
    const options:StripeElementsOptions = {
        clientSecret,
        appearance
    }
  return (
     <div className='min-h-[80vh] mt-32 max-w-full flex flex-col gap-10 items-center'>
        <h1 className='text-3xl'>
            Please complete the payment to place the order
        </h1>
         { clientSecret && (
            <Elements options={options} stripe={stripePromise}>
               <CheckoutForm dpmCheckerLink={dpmCheckerLink}/>
            </Elements>
           )
         }
     </div>
  )
}

export default Page