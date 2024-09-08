import { useMutation, useQuery } from "@tanstack/react-query"
import { API_BASE_URL } from "./authApi"



export const useCreateOrder = ()=>{
    const CreateOrder = async (gigId:{gigId:string})=>{
        const res = await fetch(`${API_BASE_URL}/api/order`,{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(gigId)
        })

        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    }

    const {mutateAsync:createOrder,isPending} = useMutation({
         mutationFn:CreateOrder,
         retry:false,
         
    })
    return {createOrder,isPending}
}

export const useConfirmPayment = ()=>{
    const ConfirmPayment = async (payment_intent:{payment_intent:string})=>{
        const res = await fetch(`${API_BASE_URL}/api/order/confirmOrder`,{
            method:"PUT",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(payment_intent)
        })
        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    }

    const {mutateAsync:confirmPayment,isPending} = useMutation({
        mutationFn:ConfirmPayment
    })
    return {confirmPayment,isPending}
}


export const useBuyerOrder = ()=>{
    const BuyerOrder = async ()=>{
        const res = await fetch(`${API_BASE_URL}/api/order/getBuyerOrder`,{
            method:"GET",
            credentials:"include"
        })
        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data 
    }

    const {data:buyerOrder,isLoading} = useQuery({
         queryKey:["getBuyerOrder"],
         queryFn:BuyerOrder
    })
    
    return {buyerOrder,isLoading}
}

export const useSellerOrder = ()=>{
    const SellerOrder = async ()=>{
       const res = await fetch(`${API_BASE_URL}/api/order/getSellerOrder`,{
        method:"GET",
        credentials:"include"
       })
       const data = await res.json()
       if(!res.ok){
        throw new Error(data.message)
       }
       return data
    }

    const {data:sellerOrder,isLoading} = useQuery({
        queryKey:["getSellerOrder"],
        queryFn:SellerOrder
    })

    return {sellerOrder,isLoading}
}