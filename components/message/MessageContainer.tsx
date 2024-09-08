import { useAddMessage, useGetMessages } from '@/api/messageApi'
import { useStateContext } from '@/context/StateContext'
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BsCheck2All } from 'react-icons/bs';
import moment from "moment";
import { FaRegPaperPlane } from 'react-icons/fa';

const MessageContainer = () => {
   const {id} = useParams();
   const searchParams = useSearchParams()
   const recipientid = searchParams.get("recipentId") as string;
  const {socketRef,userInfo,AddMessage,setAddMessage} = useStateContext()
  const {addMessage} = useAddMessage(id)
  const {Messages,isLoading,refetch} = useGetMessages(id)
  const [messageText,setMessageText] = useState("");

   console.log("recipentId",recipientid)
  useEffect(()=>{
     if(userInfo && id){
         refetch()
         setAddMessage(Messages?.message)
     }
  },[id,userInfo,Messages])
   
   console.log(AddMessage)
  const sendMessage = async()=>{
     try{
        if(socketRef.current){
           const response = await addMessage({
              message:messageText,
              recipentId:recipientid
           })
           console.log(response)
           socketRef.current.emit("sendMessage",response.message)
           setMessageText("")
        }
     }catch(error){
       console.log(error)
     }
  }

  return (
    <div className='h-[80vh] mb-10'>
       <div className='max-h-[80h] flex flex-col justify-center items-center'>
            <div className='bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 w-[80vw] border flex flex-col'>
                 <div className='mt-8'>
                   {
                    isLoading ? <div className='space-y-4 h-[50vh] overflow-y-auto pr-4'>
                        loading...
                    </div>:  <div className=' space-y-4 h-[50vh] overflow-y-auto pr-4'>
                    {
                      AddMessage?.map((message,index)=>(
                         <div key={index} className={`flex ${message.senderId === userInfo?.id ? "justify-end":"justify-start"}`}>
                             <div className={`inline-block rounded-lg ${message.senderId === userInfo?.id ? "bg-[#1DBF73] text-white":" bg-gray-100 text-gray-800"} px-4 py-2 max-w-xs break-all`}>
                                 <p>{message.text}</p>
                                 <span className='text-sm text-gray-600 flex justify-end'>
                                   {moment(message.createdAt).format('dddd, h:mm A')}
                                 </span>
                                 <span>
                                   {message.senderId === userInfo?.id && message.isRead && (
                                     <BsCheck2All/>
                                   )}
                                 </span>
                             </div>
                         </div>
                      ))
                    }
                 </div>
                   }

                 </div>

                 <div className='mt-8 flex'>
                    <input
                      type='text'
                      className='rounded-full py-2 px-4 mr-2 w-full'
                      placeholder='Type a message'
                      name='message'
                      onChange={(e)=>setMessageText(e.target.value)}
                      value={messageText}
                    />
                    <button type='submit' 
                     className='bg-[#1DBF73] text-white rounded-full px-4 py-2'
                      onClick={sendMessage}>
                       <FaRegPaperPlane/>
                    </button>
                 </div>
            </div>
       </div>
    </div>
  )
}

export default MessageContainer