"use client"

import { useCreateGigs, useEditGig, useGetGigById } from '@/api/gigsApi'
import ImageUpload from '@/components/ImageUpload'
import { categories } from '@/utils/category'
import { useParams, useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'


export type CreateGigInput = {
  title: string,
  category: string,
  description: string,
  time: number,
  revision: number,
  feature?: string,
  price: number,
  shortDesc: string
}

const Page = () => {
  const router = useRouter()
  const {id} = useParams();
  const inputClassName = "bloack p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-500"
  const labelClassName = "mb-2 text-lg font-medium text-gray-900";
  const [files, setFiles] = useState<File[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [data, setData] = useState<CreateGigInput>({
    title: "",
    category: "",
    description: "",
    time: 0,
    revision: 0,
    feature: "",
    price: 0,
    shortDesc: ""
  })
  const {editGig,isPending} = useEditGig(id)
  const {getGigById,isLoading} = useGetGigById(id)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleChangTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setData({ ...data, description: e.target.value })
  }

  const handleChangSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setData({ ...data, category: e.target.value })
  }

  useEffect(()=>{
     if(getGigById){
        setData({
            title:getGigById?.message.title,
            category:getGigById?.message.category,
            description:getGigById?.message.description,
            price:getGigById?.message.price,
            time:getGigById.message.deliveryTime,
            shortDesc:getGigById?.message.shortDesc,
            revision:getGigById?.message.revision,
          })
        setFeatures(getGigById.message.features)
        getGigById.message.images.forEach((image)=>{
          fetch(image).then(
            async(response)=>{
                const blob = await response.blob();
                const fileName = image.split('/').pop() || 'edit-image';
                const file = new File([blob], fileName, { type: blob.type });
                setFiles([file])
            }
        )
        })
     }
  },[id,getGigById])
  const addFeature = () => {
    if (data.feature) {
      setFeatures([...features, data.feature]);
      setData({ ...data, feature: "" })
    }
  }

  const removeFeature = (featureIndex: number) => {
    setFeatures((prevState) => {
      const findFeature = prevState.filter((feature, index) => index !== featureIndex)
      return findFeature
    })
  }

  const addGig = async () => {
    const {category,description,price,revision,time,title,shortDesc} = data
    if(category && description && title && features.length
      && price > 0 && shortDesc.length && revision > 0 && time > 0 
    ){
        const formdata = new FormData()
        files.forEach((file)=> formdata.append("images",file))
        formdata.append("title",title)
        formdata.append("description",description)
        formdata.append("category",category)
        formdata.append("deliveryTime",price.toString())
        formdata.append("revision",revision.toString())
        features.map((feature)=>{
          formdata.append("features[]",feature)
        })
        formdata.append("price",price.toString())
        formdata.append("shortDesc",shortDesc)

        try{
         await editGig(formdata)
         router.push("/seller/gigs")
        }catch(error){
          console.log(error)
        }
    }
  }
  return (
    <div className=' min-h-[80vh] my-10  px-32 mt-36'>
      <h1 className='text-6xl text-gray-900 mb-5'>Edit Gig</h1>
      <h3 className='text-3xl text-gray-900 mb-5'>Enter the details to edit the gig</h3>
      <div className='flex flex-col gap-5 mt-10'>
        <div className='grid grid-cols-2 gap-11'>
          <div>
            <label htmlFor='title' className={labelClassName}>
              Gig Title
            </label>
            <input type='text' className={inputClassName} placeholder='title' required
              name='title' value={data.title} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor='category' className={labelClassName}>
              Select a category
            </label>
            <select name='category' id='category' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 '
              onChange={handleChangSelect} value={data.category}>
              {
                categories.map(({ name }) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))
              }
            </select>
          </div>
        </div>

        <div>
          <label htmlFor='description' className={labelClassName}>
            Gig Description
          </label>
          <textarea name='description' id='description' value={data.description}
            className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500' placeholder='Write a short description'
            onChange={handleChangTextArea} />
        </div>

        <div className='grid grid-cols-2 gap-11'>
          <div>
            <label htmlFor='delivery' className={labelClassName}>
              Gig delivery
            </label>
            <input type='number' className={inputClassName} placeholder='Minimum delivery time' required
              name='time' value={data.time} onChange={handleChange} id="time" />
          </div>
          <div>
            <label htmlFor='revision' className={labelClassName}>
              Gig Revision
            </label>
            <input type='number' className={inputClassName} placeholder='Max number of revisions' required
              name='revision' value={data.revision} onChange={handleChange} id="revision" />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-11'>
          <div >
            <label htmlFor='feature' className={labelClassName}>
              Gig Features
            </label>
            <div className='flex gap-3 items-center mb-5'>
              <input
                type='text'
                name='feature'
                value={data.feature}
                onChange={handleChange}
                id="feature"
                className={inputClassName}
                placeholder='Enter a Feature Name'
                required
              />
              <button className='focus:outline-none text-white bg-blue-700 hover:bg-blue-800 font-medium text-lg px-10 py-3 rounded-md'
                onClick={addFeature}>
                Add
              </button>
            </div>
            <ul className='flex gap-2 flex-wrap'>
              {features.map((feature, index) => (
                <li key={index + feature}
                  className='flex gap-2 items-center py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 cursor-pointer hover:border-red-200'>
                  <span>
                    {feature}
                  </span>
                  <span className='text-red-700 cursor-pointer'
                    onClick={() => removeFeature(index)}>
                    x
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <label htmlFor='image' className={labelClassName}>
              Gig Images
            </label>
            <div>
              <ImageUpload files={files} setFile={setFiles} />
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-11'>
          <div>
            <label htmlFor='shortDesc' className={labelClassName}>
              Short Description
            </label>
            <input
              type='text'
              name="shortDesc"
              value={data.shortDesc}
              onChange={handleChange}
              id="shortDesc"
              className={inputClassName}
              placeholder='Enter a short description'
              required
            />
          </div>
          <div>
            <label htmlFor='price' className={labelClassName}>
              Gig Price( $ )
            </label>
            <input
              type='number'
              name="price"
              value={data.price}
              onChange={handleChange}
              id="price"
              className={inputClassName}
              placeholder='Enter a price'
              required
            />
          </div>
        </div>

        <div>
          <button
            className='border text-lg font-semibold px-5 py-3 bg-[#1DBF73] text-white rounded-md'
            disabled={isPending}
            type='button' onClick={addGig}>
             {isPending ? "...Updating":"Edit Gig"}
          </button>
        </div>

      </div>
    </div>
  )
}

export default Page