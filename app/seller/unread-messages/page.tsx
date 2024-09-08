"use client"
import { useGetUnreadMessage, useMarkReadMessage } from '@/api/messageApi'
import { useStateContext } from '@/context/StateContext'
import { UnreadMessageType } from '@/utils/type'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const { unreadMessage, isLoading } = useGetUnreadMessage()
    const { userInfo } = useStateContext();
    const [Messages, setMessages] = useState<UnreadMessageType[]>([]);
    const {markReadMessage,isPending} = useMarkReadMessage()

    useEffect(() => {
        if (unreadMessage) {
            setMessages(unreadMessage?.message)
        }
    }, [userInfo, unreadMessage])
    console.log(Messages)

    const markAsRead = async (mesageId: number) => {
       try{
           console.log(mesageId)
           await markReadMessage(mesageId.toString())
           setMessages((prevState)=>{
               const newMessage = prevState.filter((message)=>message.id !== mesageId)
               return newMessage
           })
       }catch(error){
         console.log(error)
       }   
    }
    return (
        <div className='mt-32'>
            {
                isLoading ? <div className=' min-h-[80vh] h-full w-full flex justify-center items-center'>
                    loading...
                </div> : <div className="min-h-[80vh] my-10 mt-0 px-32">
                    <h3 className="m-5 text-2xl font-semibold">All your Unread Messages</h3>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Text
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Sender Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Order Id
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Mark as Read
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        View Conversation
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Messages.map((message) => {
                                    return (
                                        <tr
                                            className="bg-white  hover:bg-gray-50"
                                            key={message.text}
                                        >
                                            <th scope="row" className="px-6 py-4 ">
                                                {message?.text}
                                            </th>
                                            <th scope="row" className="px-6 py-4 ">
                                                {message?.sender?.fullName}
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium">
                                                {message.orderId}
                                            </th>
                                            <td className="px-6 py-4 ">
                                                <Link
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        markAsRead(message.id);
                                                    }}
                                                    className="font-medium text-blue-600  hover:underline"
                                                >
                                                    Mark as Read
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 ">
                                                <Link
                                                    href={`/seller/orders/messages/${message.orderId}`}
                                                    className="font-medium text-blue-600  hover:underline"
                                                >
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    )
}

export default Page