"use client"

import { useLogin, useSignUp } from '@/api/authApi';
import { useStateContext } from '@/context/StateContext';
import React, { ChangeEvent, useState } from 'react';
import { useCookies } from 'react-cookie';
import { FcGoogle } from "react-icons/fc";
import { MdFacebook } from "react-icons/md";

type valueType = {
    email:string,
    password:string
}

const Authwrapper = ({type}:{type:string}) => {
    const [cookies,setCookies] = useCookies();
    const {setShowLoginModal,setShowSignUpModal,setUserInfo} = useStateContext()
     const [value,setValue] = useState<valueType>({email:"",password:""})
     const {signUp,isPending:SignupLoader} = useSignUp();
     const {login,isPending:LoginLoader} = useLogin();
     const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setValue({...value,[e.target.name]:e.target.value})
     }
     
     const handleClick = async ()=>{
        try{
            const {email,password} = value;
            if(type === "signup"){
                console.log('signup')
                const data = await signUp({email,password})
                const {message,token} = data;
                setCookies("token",{token})
                setValue({email:"",password:""})
                setUserInfo(message)
            }
            if(type === "login"){
                console.log('login')
                const data = await login({email,password})
                const {message,token} = data;
                setCookies("token",{token})
                setValue({email:"",password:""})
                setUserInfo(message)
            }
            setShowSignUpModal(false)
            setShowLoginModal(false)
        }catch(error){
            console.log(error)
        }
     }

    return (
        <div className='fixed top-0 z-[100]'>
            <div className='h-[100vh] w-[100vw] backdrop-blur-md fixed top-0' id='blur-div'></div>
            <div className='h-[100vh] w-[100vw] flex flex-col justify-center items-center'>
                <div className='fixex z-[101] h-max w-max bg-white flex flex-col justify-center items-center' id="auth-model">
                    <div className='flex flex-col justify-center items-center px-8 py-5 gap-7'>
                        <h3 className='text-2xl font-semibold to-slate-700'>
                            {type === "login" ? "Login to Fiverr": "SignUp to Fiverr"}
                        </h3>
                        <div className="flex flex-col gap-5">
                            <button className="text-white bg-blue-500 p-3 font-semibold w-80 flex items-center justify-center relative">
                                <MdFacebook className="absolute left-4 text-2xl" />
                                Continue with Facebook
                            </button>
                            <button className="border border-slate-300 p-3 font-medium w-80 flex items-center justify-center relative">
                                <FcGoogle className="absolute left-4 text-2xl" />
                                Continue with Google
                            </button>
                        </div>
                        <div className="relative  w-full text-center">
                            <span className="before:content-[''] before:h-[0.5px] before:w-80 before:absolute before:top-[50%] before:left-0 before:bg-slate-400">
                                <span className="bg-white relative z-10 px-2">OR</span>
                            </span>
                        </div>

                        <div className='flex flex-col gap-5' >
                            <input type='text' name='email' placeholder='Email'
                                className='border border-slate-300 p-3 w-80' value={value.email} onChange={handleChange}/>
                            <input type='password' name='password' placeholder='Password'
                                className='border border-slate-300 p-3 w-80' value={value.password} onChange={handleChange}/>
                            <button className='bg-[#1DBF73] text-white px-12 text-lg font-semibold rounded-r-md p-3 w-80' onClick={handleClick} disabled={SignupLoader}>
                                {
                                    SignupLoader ? "...Loading":"Continue"
                                }
                            </button>
                        </div>
                    </div>

                    <div className='py-5 w-full flex items-center justify-center border-t border-r-slate-400'>
                        <span className='text-sm text-slate-700'>
                            {type === "login" ? "Not a member yet ?":"Already a member ?"} {" "}
                            {
                                type === "login" ? 
                                <span className='text-[#1DBF73] cursor-pointer' onClick={()=>{setShowLoginModal(false);setShowSignUpModal(true)}}>
                                    Join Now
                                </span>:
                                <span className='text-[#1DBF73] cursor-pointer' onClick={()=>{setShowSignUpModal(false);setShowLoginModal(true)}}>
                                 Login Now
                                 </span>
                            }
                        </span>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default Authwrapper