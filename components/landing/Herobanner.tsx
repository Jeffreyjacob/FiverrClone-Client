"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const HeroBanner = () => {
  const router = useRouter();
  const [image, setImage] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setImage(image >= 6 ? 1 : image + 1)
    }, 10000)

    return () => clearInterval(interval);
  }, [image])
  return (
    <div className='h-[480px] relative bg-cover'>
      <div className=' absolute top-0 right-0 w-[100vw] h-full transition-opacity z-6'>
        <Image alt='hero' src="/bg-hero1.webp" fill
          className={`${image === 1 ? " opacity-100" : " opacity-0"} transition-all duration-1000`} />

        <Image alt='hero' src="/bg-hero2.webp" fill
          className={`${image === 2 ? " opacity-100" : " opacity-0"} transition-all duration-1000`} />

        <Image alt='hero' src="/bg-hero3.webp" fill
          className={`${image === 3 ? " opacity-100" : " opacity-0"} transition-all duration-1000`} />

        <Image alt='hero' src="/bg-hero4.webp" fill
          className={`${image === 4 ? " opacity-100" : " opacity-0"} transition-all duration-1000`} />

        <Image alt='hero' src="/bg-hero5.webp" fill
          className={`${image === 5 ? " opacity-100" : " opacity-0"} transition-all duration-1000`} />

        <Image alt='hero' src="/bg-hero6.webp" fill
          className={`${image === 6 ? " opacity-100" : " opacity-0"} transition-all duration-1000`} />
      </div>
      <div className='z-10 relative w-[650px] justify-center flex flex-col h-full gap-5 ml-20'>
        <h1 className='text-white text-5xl leading-snug'>
          Find the perfect&nbsp;
          <i>Freelance</i><br/>
          services for your business.
        </h1>
        <div className=' flex align-middle'>
           <div className='relative'>
           <input type='text' className='h-14 w-[450px] pl-10 rounded-md rounded-r-none' 
              placeholder='Try building mobile app'/>
           </div>
           <button className='bg-[#1DBF73] text-white px-12 text-lg font-semibold rounded-r-md '>
          search
        </button>
        </div>

        <div className='text-white flex gap-4'>
          Popular <ul className='flex gap-5'>
              <li className='text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer'>
                website design
              </li>
              <li className='text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer'>
                wordpress
              </li>
              <li className='text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer'>
                logo Design
              </li>
              <li className='text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer'>
                Ai services
              </li>
          </ul>
        </div>
      </div>
    </div>
  )
}


export default HeroBanner