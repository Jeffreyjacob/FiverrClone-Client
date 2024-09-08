import { useMutation, useQuery } from "@tanstack/react-query"
import { API_BASE_URL } from "./authApi";
import toast from "react-hot-toast";
import { ReviewInputType, SearchInputType, SearchUserGigsType, UserGigsType } from "@/utils/type";


export const useCreateGigs = ()=>{
    const CreateGigs = async (ImageInput:FormData)=>{
        const res = await fetch(`${API_BASE_URL}/api/gigs/add`,{
            method:"POST",
            credentials:"include",
            body:ImageInput
        })

        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    }

    const {mutateAsync:createGig,isPending} = useMutation({
        mutationFn:CreateGigs,
        onSuccess:()=>{
            toast.success("Gig Created")
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })

    return {createGig,isPending}
}


export const useGetUserGigs = ()=>{
    const GetUserGigs = async ()=>{
        const res = await fetch(`${API_BASE_URL}/api/gigs/getUserGigs`,{
            method:"GET",
            credentials:"include"
        })

        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    }

    const {data:getUserGigs,isLoading} = useQuery({
        queryKey:["getUserGigs"],
        queryFn:GetUserGigs
    })

    return {getUserGigs,isLoading}
}

export const useGetGigById = (id:string | string[])=>{
   const GetGigById =  async ():Promise<{status:string,message:UserGigsType}>=>{
     const res = await fetch(`${API_BASE_URL}/api/gigs/getGigById/${id}`,{
         method:"GET",
         credentials:"include"
     })

     const data = await res.json()
     if(!res.ok){
        throw new Error(data.message)
     }
     return data
   }

   const {data:getGigById,isLoading} = useQuery({
      queryKey:["getGigById"],
      queryFn:GetGigById,
      enabled:!!id
   })

   return {getGigById,isLoading}
}

export const useEditGig = (id:string | string[])=>{
    const EditGig = async (EditGigInput:FormData)=>{
        const res = await fetch(`${API_BASE_URL}/api/gigs/editGig/${id}`,{
             method:"PUT",
             credentials:"include",
             body:EditGigInput
        })

        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    }

    const {mutateAsync:editGig,isPending} = useMutation({
        mutationFn:EditGig,
        onSuccess:()=>{
            toast.success("Gig updated")
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })

    return {editGig,isPending}
}

export const useSearchGig = (searchInput:SearchInputType)=>{
    const SearchGig = async ():Promise<{status:string,message:SearchUserGigsType[]}>=>{
         const res = await fetch(`${API_BASE_URL}/api/gigs/searchGig?searchTerm=${searchInput.searchTerm}&category=${searchInput.category}`,{
            method:"GET",
            credentials:"include"
         })

         const data = await res.json()
         if(!res.ok){
            throw new Error(data.message)
         }
         return data
    }

    const {data:searchGigData,isLoading,refetch} = useQuery({
         queryKey:["searchGig"],
         queryFn:SearchGig,
         enabled:!! searchInput
    })

    return {searchGigData,isLoading,refetch}

}


export const useCheckGigOrder = (gigId:String|string[])=>{
    const CheckGigOrder = async ()=>{
        const res = await fetch(`${API_BASE_URL}/api/gigs/checkGigOrder/${gigId}`,{
            method:"GET",
            credentials:"include"
        })

        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    }

    const {data:checkGigOrder,isLoading} = useQuery({
        queryKey:["getCheckGigOrder"],
        queryFn:CheckGigOrder
    })

    return {checkGigOrder,isLoading}
}

export const useAddReview = (id:string|string[])=>{
    const AddReview = async (ReviewInput:ReviewInputType)=>{
        const res = await fetch(`${API_BASE_URL}/api/gigs/addReview/${id}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(ReviewInput)
        })

        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    }

    const {mutateAsync:addReview,isPending} = useMutation({
        mutationFn:AddReview,
        onSuccess:()=>{
            toast.success("Review Added")
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })

    return {addReview,isPending}
}
