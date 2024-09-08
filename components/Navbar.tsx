"use client"

import { useStateContext } from '@/context/StateContext';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import FiverrLogo from './FiverLogo';
import { IoSearchOutline } from 'react-icons/io5';
import { usePathname, useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { useAuthuser, useLogout } from '@/api/authApi';
import Image from 'next/image';
import { CiLogout } from "react-icons/ci";

const Navbar = () => {
    const router = useRouter();
    const pathName = usePathname()
    const { setShowLoginModal, setShowSignUpModal,
        userInfo, showLoginModal, showSignUpModal, setUserInfo,
        isSeller, setIsSeller
    } = useStateContext()
    const handleLogin = () => {
        if (showSignUpModal) {
            setShowSignUpModal(false)
        }
        setShowLoginModal(true)
    }
    const handleSignup = () => {
        if (showLoginModal) {
            setShowLoginModal(false)
        }
        setShowSignUpModal(true)
    }
    useEffect(() => {
        if (pathName === "/") {
            const positionNavbar = () => {
                window.pageYOffset > 0 ? setNavFixed(true) : setNavFixed(false);
            }
            window.addEventListener("scroll", positionNavbar);
            return () => window.removeEventListener("scroll", positionNavbar)
        } else {
            setNavFixed(true)
        }
    }, [pathName])
    const { authUser, isLoading,refetch} = useAuthuser();
    const [navFixed, setNavFixed] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [cookies] = useCookies()
    const {logOut} = useLogout()
    const links = [
        { linkName: "Fiverr Business", handler: "#", type: "link" },
        { linkName: "Explore", handler: "#", type: "link" },
        { linkName: "English", handler: "#", type: "link" },
        { linkName: "Become a Seller", handler: "#", type: "link" },
        { linkName: "Sign in", handler: handleLogin, type: "button" },
        { linkName: "Join", handler: handleSignup, type: "button2" },
    ];
    useEffect(() => {
         refetch()
        if (cookies.token && !userInfo) {
            if (authUser) {
                setUserInfo(authUser.message)
                if (!authUser.message.isProfileInfoSet) {
                       router.push("/profile")
                }
            }
        }
    }, [cookies, authUser,refetch])
    const handleOrdersNavigate = () => {
        if (isSeller) {
            router.push("/seller/orders")
        } else {
            router.push("/buyer/orders")
        }
    }

    const handleSwitchMode = () => {
        setIsSeller(!isSeller)
        if (isSeller) {
            router.push("/buyer/orders")
        } else {
            router.push("/seller")
        }
    }
    console.log(userInfo, "userInfo")
    const logoutHandler = async ()=>{
       try{
         await logOut()
         router.push("/")
       }catch(error){
        console.log(error)
       }
    }
    return (
        <>
            {
                !isLoading && <nav className={`w-full px-24 flex justify-between items-center py-4 top-0 z-30 transition-all duration-300 ${navFixed || userInfo ? "fixed bg-white border-gray-200 shadow-md" : " absolute bg-transparent border-transparent"}`}>
                    <div>
                        <Link href="/">
                            <FiverrLogo fillColor={!navFixed && !userInfo ? "#ffffff" : "#404145"} />
                        </Link>
                    </div>
                    <div className={`flex ${navFixed || userInfo ? " opacity-100" : " opacity-0"}`}>
                        <input type='text' className='w-[25rem] py-2.5 px-4 border' value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder='What service are you loooking for today?' />
                        <button className='bg-gray-900 py-1.5 text-white w-16 flex justify-center items-center'
                            onClick={() => { setSearchValue(""), router.push(`/search?q=${searchValue}`) }}>
                            <IoSearchOutline className='fill-white text-white h-6 w-6' />
                        </button>
                    </div>
                    {!userInfo ? <ul className=' flex gap-4 items-center'>
                        {links.map(({ linkName, handler, type }) => {
                            return (
                                <li key={linkName} className={`${navFixed ? "text-base" : "text-white"} font-medium text-[14px]`}>
                                    {type === "link" && <Link href={handler as string}>{linkName}</Link>}
                                    {type === "button" && typeof handler === "function" && (<button onClick={handler}>{linkName}</button>)}
                                    {type === "button2" && typeof handler === "function" && (
                                        <button onClick={handler} className={`border text-md font-semibold py-1 px-3 rounded-sm
                             ${navFixed ? "border-[#1DBF73] text-[#1DBF73]" : "border-white text-white"}
                             hover:bg-[#1DBF73] hover:text-white hover:border-[#1DBF73] transition-all duration-300`}>
                                            {linkName}
                                        </button>
                                    )}
                                </li>
                            )
                        })}
                    </ul> :
                        <ul className=' flex gap-10 items-center'>
                            {isSeller && <li className=' cursor-pointer text-[#1DBF73] font-medium'
                                onClick={() => router.push("/seller/gigs/create")}>
                                Create Gig
                            </li>}

                            <li className='cursor-pointer text-[#1DBF73] font-medium'
                                onClick={handleOrdersNavigate}>
                                Orders
                            </li>

                            {isSeller ? (
                                <li className=' cursor-pointer font-medium' onClick={handleSwitchMode}>
                                    Switch to Buyer
                                </li>
                            ) : (
                                <li className=' cursor-pointer font-medium' onClick={handleSwitchMode}>
                                    Switch to Seller
                                </li>
                            )}

                            <li className=' cursor-pointer' onClick={(e) => { e.stopPropagation()}} title='Profile'>
                                {userInfo.profileImage ? (
                                    <Image
                                        src={userInfo.profileImage}
                                        alt='Profile'
                                        width={40}
                                        height={40}
                                        className='rounded-full'
                                    />
                                ) : (
                                    <div className=' bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full relative'>
                                        <span className='text-xl text-white'>
                                            {userInfo.email[0].toUpperCase()}
                                        </span>
                                    </div>
                                )}
                            </li>
                        </ul>}

                       {userInfo && <CiLogout className='w-8 h-8 text-red-600 cursor-pointer' onClick={logoutHandler}/>}
                </nav>
            }
        </>
    )
}

export default Navbar