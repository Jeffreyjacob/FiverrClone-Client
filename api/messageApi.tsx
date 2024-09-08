import { MessageInput } from "@/utils/type"
import { API_BASE_URL } from "./authApi"
import { useMutation, useQuery } from "@tanstack/react-query"


export const useAddMessage = (orderId:String | string[])=>{
    const AddMessage = async (messageInput:MessageInput)=>{
        const res = await fetch(`${API_BASE_URL}/api/message/${orderId}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(messageInput)
        })

        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    }
    
    const {mutateAsync:addMessage,isPending} = useMutation({
        mutationFn:AddMessage
    })
   
     return {addMessage,isPending}
}

export const useGetMessages = (orderId:string | string[])=>{
    const GetMessages = async ()=>{
        const res = await fetch(`${API_BASE_URL}/api/message/${orderId}`,{
            method:"GET",
            credentials:"include"
        })

        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    }

    const {data:Messages,isLoading,refetch} = useQuery({
         queryKey:["getMessages"],
         queryFn:GetMessages
    })

    return {Messages,isLoading,refetch}
}

export const useGetUnreadMessage = ()=>{
    const UnreadMessage = async()=>{
        const res =  await fetch(`${API_BASE_URL}/api/message/getUnreadMessage`,{
            method:"GET",
            credentials:"include"
        })

        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    }

    const {data:unreadMessage,isLoading} = useQuery({
         queryKey:["getUnreadMessage"],
         queryFn:UnreadMessage
    })

    return {unreadMessage,isLoading}
}

export const useMarkReadMessage = ()=>{
    const MarkReadMessage = async (messageId:string)=>{
        const res = await fetch(`${API_BASE_URL}/api/message/markAsRead/${messageId}`,{
            method:"PUT",
            credentials:"include"
        })
        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    }

    const {mutateAsync:markReadMessage,isPending} = useMutation({
        mutationFn:MarkReadMessage
    })

    return {markReadMessage,isPending}
}
