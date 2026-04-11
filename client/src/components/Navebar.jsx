import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "motion/react";
import { BsRobot } from "react-icons/bs";
import { BsCoin } from "react-icons/bs";
import { FaUserAstronaut } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from "react-icons/ai";
import axios from 'axios';
import { setUserData } from '../redux/userSlice';
import AuthModle from './AuthModle';

function Navebar() {
    const { userData } = useSelector((state) => state.user)
    const [showCreditPopup, setShowCreditPopup] = useState(false)
    const [showUserPopup, setShowUserPopup] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [showAuth, setshowAuth] = useState(false)

    const handleLogout = async () => {
        try {
            await axios.get(import.meta.env.VITE_SERVER_URL + "/api/auth/logout",
                { withCredentials: true })
            dispatch(setUserData(null))
            setShowCreditPopup(false)
            setShowUserPopup(false)
            navigate("/")


        } catch (error) {
            console.log(error)

        }

    }

    return (
        <div className="bg-linear-to-br from-gray-50
     to-emerald-100 flex justify-center px-4 pt-6 sticky top-0 z-50 ">
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-6xl bg-white rounded-[24px] shadow-sm
        border border-green-500 px-8 py-4 flex justify-between items-center
         relative">
                <div className='flex items-center gap-3 '>
                    <div className='bg-black text-white p-2 rounded-lg'>
                        <BsRobot size={18} />
                    </div>
                    <h1 className="font-semibold hidden md:block text-lg">InterviewIQ.AI</h1>

                </div>
                <div className='flex items-center gap-6 relative'>
                    <div className="relative">
                        <button onClick={() => {
                            if (!userData) {
                                setshowAuth(true)
                                return;
                            }
                            setShowCreditPopup(!showCreditPopup); setShowUserPopup(false)
                        }}
                            className='flex items-center gap-2 bg-gray-200 
                    px-4 py-2 rounded-full text-md hover:bg-gray-300 transition cursor-pointer'>
                            <BsCoin size={20} />
                            {userData?.credits || 0}


                        </button>
                        {showCreditPopup && (
                            <div className="absolute right-[-50px] mt-3 w-64 
                        bg-white shadow-x1 border border-green-500 rounded-xl 
                        p-5 z-50">
                                <p className="text-sm text-gray-600 
                            mb-4">Need more credits to continue interviews ? </p>
                                <button onClick={() => navigate("/pricing")}
                                    className='w-full bg-black text-white py-2 
                            rounded-lg text-sm cursor-pointer'>
                                    Buy More Credits

                                </button>

                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <button onClick={() => {
                            if (!userData) {
                                setshowAuth(true)
                                return;
                            }
                            setShowUserPopup(!showUserPopup); setShowCreditPopup(false)
                        }}
                            className='w-9 h-9 bg-black text-white rounded-full flex items-center justify-center 
                    font-semibold cursor-pointer'>

                            {userData?.name
                                ? userData.name.slice(0, 1).toUpperCase()
                                : <FaUserAstronaut size={16} />
                            }


                        </button>
                        {showUserPopup && (
                            <div className='absolute right-0 mt-3 w-90 bg-white 
                            shadow-xl border border-green-500 rounded-xl p-4  z-50 flex-wrap'>
                                <p className='text-md text-blue-500 font-medium 
                                 mb-1'>
                                    {userData?.name} <br />
                                    {userData?.email}

                                </p>

                                <button onClick={() => navigate("/history")}
                                    className='w-full text-left text-sm py-2 hover:text-black text-gray-600 cursor-pointer'>
                                    Interview History
                                </button>

                                <button onClick={handleLogout}
                                    className='w-full text-left text-sm py-2 flex items-center gap-2 text-red-500 cursor-pointer'>
                                    <AiOutlineLogout size={15} />
                                    logout
                                </button>

                            </div>
                        )}

                    </div>

                </div>

            </motion.div>

            {showAuth && <AuthModle onClose={() => setshowAuth(false)} />}


        </div>
    )
}

export default Navebar