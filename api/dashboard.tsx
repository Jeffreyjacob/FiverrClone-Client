import { useQuery } from "@tanstack/react-query"
import { API_BASE_URL } from "./authApi"


export const useDashboard = ()=>{
    const Dashboard = async ()=>{
        const res = await fetch(`${API_BASE_URL}/api/dashboard/seller`,{
          method:"GET",
          credentials:"include"
        })

        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    }

    const {data:dashboard,isLoading} = useQuery({
        queryKey:["getDashboard"],
        queryFn:Dashboard
    })

    return {dashboard,isLoading}
}
