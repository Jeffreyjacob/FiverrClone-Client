"use client"
import { useSearchGig } from '@/api/gigsApi';
import SearchGridItem from '@/components/search/SearchGridItem';
import { SearchUserGigsType, UserGigsType } from '@/utils/type';
import { useSearchParams } from 'next/navigation';


import React, { useEffect, useState } from 'react'

const Page = () => {
    const SearchParams = useSearchParams();
    const categoryStr =  SearchParams.get("category") as string
    const searchTerm =  SearchParams.get("q") as string
    const [gigs,setGigs] = useState<SearchUserGigsType[]>([]);
    const {searchGigData,isLoading,refetch} = useSearchGig({category:categoryStr,searchTerm:searchTerm})
    useEffect(() => {
        refetch();  // Trigger the refetch when category or search term changes
      }, [categoryStr,searchTerm, refetch]);

    useEffect(()=>{
        if(searchGigData){
            setGigs(searchGigData?.message)
        }
    },[searchGigData])

    console.log(gigs)
  return (
    <div className='mx-24 mb-24 mt-32'>
       {searchTerm && (
         <h3 className='text-4xl mb-10'>
            Result for <strong>{searchTerm}</strong>
         </h3>
       )}
       <div className='flex gap-4'>
        <button className='py-3 px-5 border border-gray-400 rounded-lg font-medium'>
          Category
        </button>
        <button className='py-3 px-5 border border-gray-400 rounded-lg font-medium'>
          Budget
        </button>
        <button className='py-3 px-5 border border-gray-400 rounded-lg font-medium'>
          Delivery Time
        </button>
       </div>

        <div className='my-4'>
            <span className='text-[#74767e] font-medium'>
                {gigs.length} services avaliable
            </span>
        </div>
        <div className='grid grid-cols-3'>
           {gigs.map((gig)=>(
            <SearchGridItem key={gig.id} gig={gig}/>
           ))}
        </div>
    </div>
  )
}

export default Page