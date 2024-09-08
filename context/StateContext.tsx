"use client"

import { API_BASE_URL } from "@/api/authApi";
import { AddReviewResponseType, MessageType, UserInfoType } from "@/utils/type";
import { createContext, ReactNode,SetStateAction,useContext,useEffect,useRef,useState } from "react";
import {Socket,io} from "socket.io-client"

type StateContextType = {
  showLoginModal:Boolean,
  setShowLoginModal:React.Dispatch<React.SetStateAction<boolean>>
  showSignUpModal:Boolean
  setShowSignUpModal:React.Dispatch<React.SetStateAction<boolean>>
  userInfo:UserInfoType | null,
  setUserInfo:React.Dispatch<React.SetStateAction<UserInfoType | null>>
  isSeller: boolean,
  setIsSeller:React.Dispatch<React.SetStateAction<boolean>>
  AddReview:AddReviewResponseType[],
  setAddReview:React.Dispatch<React.SetStateAction<AddReviewResponseType[]>>
  socketRef:React.RefObject<Socket | null>
  AddMessage:MessageType[]
  setAddMessage:React.Dispatch<SetStateAction<MessageType[]>>
}

const StateContext = createContext<StateContextType |null>(null);


export const StateProvider = ({children}:{children:ReactNode})=>{
     const [showLoginModal,setShowLoginModal] = useState<boolean>(false)
     const [ showSignUpModal,setShowSignUpModal]= useState<boolean>(false)
     const [userInfo,setUserInfo] = useState<UserInfoType | null>(null)
     const [isSeller,setIsSeller] = useState<boolean>(false)
     const [AddReview,setAddReview] = useState<AddReviewResponseType[]>([])
     const socketRef = useRef<Socket | null>(null)
     const [AddMessage,setAddMessage] = useState<MessageType[]>([])

      useEffect(()=>{
        if(userInfo){
           socketRef.current = io(API_BASE_URL!,{
              withCredentials:true,
              query:{userId:userInfo.id.toString()}
           });

           socketRef.current.on("connect",()=>{
            console.log("connected server")
           })

           socketRef.current.on("sendMessage",(message:MessageType)=>{
            console.log(message,"recievedMessage")
               setAddMessage((prevMessages) => [...prevMessages, message]);
           })
        }
        return ()=>{
           socketRef.current?.disconnect();
           socketRef.current?.off("sendMessage")
        }
      },[userInfo])

  return (
    <StateContext.Provider value={{showLoginModal,setShowLoginModal,showSignUpModal,
    setShowSignUpModal,userInfo,setUserInfo,isSeller,setIsSeller,AddReview,setAddReview,
    socketRef,AddMessage,setAddMessage}}>
       {children}
    </StateContext.Provider>
  )
}



export const useStateContext = () => {
    const context = useContext(StateContext);
    if (context === null) {
      throw new Error("useStateContext must be used within a StateProvider");
    }
    return context;
  };
  
