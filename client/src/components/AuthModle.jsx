import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaTimesCircle } from "react-icons/fa";
import Auth from '../pages/Auth';

function AuthModle({onClose}) {
    const {userData} = useSelector((state)=>state.user)
    useEffect(() =>{
        if(userData){
            onClose()
        }

    },[userData , onClose])

  return (
    <div className='fixed inset-0 z-[999] flex items-center justify-center 
    bg-black/50 backdrop-blur-sm px-4'>
        <div className='relative w-full max-w-md'>
            <button onClick={onClose}
            className='absolute top-8 right-5 text-gray-800  
            hover:text-black text-xl cursor-pointer z-10'>
                <FaTimesCircle size={20}/>
            </button>
            <Auth isModel={true}/>

        </div>

    </div>
  )
}

export default AuthModle