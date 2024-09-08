"use client"

import { useSetUserInfo } from '@/api/authApi';
import { useStateContext } from '@/context/StateContext'
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react';

type ProfileDetail = {
    username: string,
    fullname: string,
    description: string
}

const Page = () => {
    const router = useRouter()
    const { userInfo } = useStateContext();
    const [isLoading, setIsLoading] = useState(true)
    const [imageHover, setImageHover] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [data, setData] = useState<ProfileDetail>({
        username: "",
        fullname: "",
        description: ""
    })
    const {setUserInfo,isPending} = useSetUserInfo();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleChangeArea = (e:ChangeEvent<HTMLTextAreaElement>)=>{
        setData({...data,description:e.target.value})
    }
    const InputCaseName = " block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
    const labelClassName = "mb-2 text-lg font-medium text-gray-900";

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        let files = e.target.files;
        if (!files || files.length === 0) return;
        const file = files[0]
        const fileType = file["type"];
        const validImageTypes = ["image/gif", "image/jpeg", "image/png", "image/jpg"]
        if (validImageTypes.includes(fileType)) {
            setImage(file);
        } else {
            console.log("invalid image type")
        }
    }

    useEffect(()=>{
       if(userInfo){
         setData({
            username:userInfo.username,
            fullname:userInfo.fullName,
            description:userInfo.description
         })

         if(userInfo.profileImage){
            const fileName = image;
            fetch(userInfo.profileImage).then(
                async(response)=>{
                    const blob = await response.blob();
                    const fileName = userInfo.profileImage.split('/').pop() || 'profile-image';
                    const file = new File([blob], fileName, { type: blob.type });
                    setImage(file);
                }
            )
         }
       }
    },[userInfo])

    const setProfile = async ()=>{
        try{
        const formdata = new FormData()
        formdata.append("username",data.username)
        formdata.append("fullname",data.fullname)
        formdata.append("description",data.description)
        if(image){
            formdata.append("imageFile",image)
        }
        await setUserInfo(formdata)
        setData({username:"",fullname:"",description:""})
        router.push("/")
        }catch(error){
            console.log(error)
        }
    } 
    return (
        <>
            {
                isLoading && <div className='flex flex-col items-center justify-start min-h-[60vh] gap-3 mt-36'>
                    {
                        errorMessage && (
                            <div>
                                <span className='text-red-600 font-bold'>{errorMessage}</span>
                            </div>
                        )}
                    <h2 className='text-3xl'>Welcome to Fiverr Clone</h2>
                    <h4 className='text-xl'>
                        Please Complete your profile to get started
                    </h4>
                    <div className='flex flex-col items-center w-full gap-5 mb-10'>
                        <div className='flex flex-col items-center cursor-pointer'
                            onMouseEnter={() => setImageHover(true)} onMouseLeave={() => setImageHover(false)}>
                            <label className={labelClassName}>
                                Select a profile Picture
                            </label>

                            <div className='bg-purple-500 h-36 w-36 flex items-center justify-center rounded-full relative'>
                                {image ? (
                                    <Image
                                        src={URL.createObjectURL(image)}
                                        alt='Profile'
                                        fill
                                        className='rounded-full'
                                    />
                                ) : (
                                    <span className='text-6xl text-white'>
                                        {userInfo?.email[0].toUpperCase()}
                                    </span>
                                )}

                                <div className={`absolute bg-slate-400 w-full h-full rounded-full flex items-center justify-center transition-all duration-100 
                                    ${imageHover ? "opacity-100" : "opacity-0"}`}>
                                    <span
                                        className={` flex items-center justify-center  relative`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-12 h-12 text-white absolute"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <input
                                            type="file"
                                            onChange={handleFile}
                                            className="opacity-0"
                                            multiple={true}
                                            name="profileImage"
                                        />
                                    </span>
                                </div>

                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-4 w-[500px]'>
                            <div>
                                <label className={labelClassName} htmlFor="userName">
                                    Please select a username
                                </label>
                                <input type='text'
                                    className={InputCaseName}
                                    name='username'
                                    placeholder='Username'
                                    value={data.username}
                                    onChange={handleChange} />
                            </div>

                            <div>
                                <label className={labelClassName} htmlFor="fullname">
                                    Please select full name
                                </label>
                                <input type='text'
                                    className={InputCaseName}
                                    name='fullname'
                                    placeholder='Full Name'
                                    value={data.fullname}
                                    onChange={handleChange} />
                            </div>
                        </div>

                        <div className='flex flex-col w-[500px]'>
                          <label className={labelClassName} htmlFor='description'>
                            Description
                          </label>
                          <textarea
                           name='description'
                           id="description"
                           value={data.description}
                           className={InputCaseName}
                           placeholder='description'
                           onChange={handleChangeArea}
                          ></textarea>
                        </div>

                        <button
                        className='border text-lg font-semibold px-5 py-3 bg-[#1DBF73] text-white rounded-md'
                        type='button'
                        onClick={setProfile}
                        >
                        Set Profile
                        </button>

                    </div>
                </div>
            }
        </>
    )
}

export default Page