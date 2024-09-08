

import { LoginInput, UserInfoType } from "@/utils/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {toast} from "react-hot-toast";

export type SignUpInput = {
    email:string,
    password:string
} 

type GetAuthuser = {
    status:string,
    message:UserInfoType
}


export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const useSignUp = ()=>{
    const SignUp = async (SignupInput:SignUpInput)=>{
        const res = await fetch(`${API_BASE_URL}/api/auth/signup`,{
            method:"POST",
            credentials:"include",
            headers:{
               "Content-Type": "application/json"
            },
            body:JSON.stringify(SignupInput)
        })

        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    }

    const {mutateAsync:signUp,isPending} = useMutation({
        mutationFn:SignUp
    })

    return {signUp,isPending}
}


export const useLogin = ()=>{
     const Login = async (LoginInput:LoginInput)=>{
        const res = await fetch(`${API_BASE_URL}/api/auth/login`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
             },
            credentials:"include",
            body:JSON.stringify(LoginInput)
        })

        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
     }
    
     const {mutateAsync:login,isPending} = useMutation({
         mutationFn:Login
     })

     return {login,isPending}
}

export const useAuthuser = ()=>{
    const AuthUser = async ():Promise<GetAuthuser> =>{
        const res = await fetch(`${API_BASE_URL}/api/auth/getAuthUser`,{
            method:"GET",
            credentials:"include"
        })
        
        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    }

    const {data:authUser,isLoading,refetch,isRefetching} = useQuery({
        queryKey:["getAuthuser"],
        queryFn:AuthUser
    })

    return {authUser,isLoading,refetch,isRefetching}
}


export const useSetUserInfo = ()=>{
    const SetUserInfo = async (userInput:FormData)=>{
         const res = await fetch(`${API_BASE_URL}/api/auth/setUserInfo`,{
             method:"PUT",
             credentials:"include",
             body:userInput
         })

         const data = await res.json()
         if(!res.ok){
            throw new Error(data.message)
         }
         return data
    }

    const {mutateAsync:setUserInfo,isPending} = useMutation({
        mutationFn:SetUserInfo,
        onSuccess:()=>{
            toast.success("Profile updated")
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })

    return {setUserInfo,isPending}
}

export const useLogout = ()=>{
    const queryClient = useQueryClient()
    const Logout = async ()=>{
        const res = await fetch(`${API_BASE_URL}/api/auth/logout`,{
            method:"POST",
            credentials:"include"
        })
        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    }

    const {mutateAsync:logOut} = useMutation({
        mutationFn:Logout,
        onSuccess:()=>{
            toast.success("logout successful!")
            queryClient.invalidateQueries({queryKey:["getAuthuser"]})
        }
    })

    return {logOut}
}