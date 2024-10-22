"use client"
import { useDashboard } from '@/api/dashboard'
import { useStateContext } from '@/context/StateContext'
import { DashboardDataType } from '@/utils/type'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const {dashboard,isLoading} = useDashboard()
    const {userInfo} = useStateContext()
    const router = useRouter()
    const [dashboardData,setDashboardData] = useState<DashboardDataType | null>(null)

    useEffect(()=>{
       if(dashboard){
         setDashboardData(dashboard?.dashboardData)
       }
    },[userInfo,dashboard])
    console.log(dashboardData)

  return (
    <div className='mt-32'>
         {
            isLoading ? <div className='min-h-screen h-full w-full flex justify-center items-center'>
              loading...
            </div>:<div>
            {userInfo && (
        <div className="flex min-h-[80vh] my-10 mt-0 px-32 gap-5">
          <div className="shadow-md h-max p-10 flex flex-col gap-5 min-w-96 w-96">
            <div className="flex gap-5 justify-center items-center">
              <div>
                {userInfo?.profileImage ? (
                  <Image
                    src={userInfo.profileImage}
                    alt="Profile"
                    width={120}
                    height={120}
                    className="rounded-full"
                  />
                ) : (
                  <div className="bg-purple-500 h-24 w-24 flex items-center justify-center rounded-full relative">
                    <span className="text-5xl text-white">
                      {userInfo.email[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[#62646a] text-lg font-medium">
                  {userInfo.username}
                </span>
                <span className="font-bold text-md">{userInfo.fullName}</span>
              </div>
            </div>
            <div className="border-t py-5 text-[14px]">
              <p>{userInfo.description}</p>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-3 gap-10 w-full">
              <div
                className="shadow-md h-max p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => router.push("/seller/gigs")}
              >
                <h2 className="text-lg">Total Gigs</h2>
                <h3 className="text-[#1DBF73] text-2xl font-extrabold">
                  {dashboardData?.gigs}
                </h3>
              </div>
              <div
                className="shadow-md h-max p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => router.push("/seller/orders")}
              >
                <h2 className="text-lg">Total Orders</h2>
                <h3 className="text-[#1DBF73] text-2xl font-extrabold">
                  {dashboardData?.orders}
                </h3>
              </div>
              <div
                className="shadow-md h-max p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => router.push("/seller/unread-messages")}
              >
                <h2 className="text-lg"> Unread Messages</h2>
                <h3 className="text-[#1DBF73] text-2xl font-extrabold">
                  {dashboardData?.unreadMessages}
                </h3>
              </div>

              <div className="shadow-md h-max p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300">
                <h2 className="text-lg">Earnings Today</h2>
                <h3 className="text-[#1DBF73] text-2xl font-extrabold">
                  ${dashboardData?.dailyRevenue}
                </h3>
              </div>
              <div className="shadow-md h-max p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300">
                <h2 className="text-lg">Earnings Monthly</h2>
                <h3 className="text-[#1DBF73] text-2xl font-extrabold">
                  ${dashboardData?.monthlyRevenue}
                </h3>
              </div>
              <div className="shadow-md h-max p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300">
                <h2 className="text-lg">Earnings Yearly</h2>
                <h3 className="text-[#1DBF73] text-2xl font-extrabold">
                  ${dashboardData?.revenue}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
            </div>
         }
    </div>
  )
}

export default Page