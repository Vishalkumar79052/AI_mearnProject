import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";

function InterviewHistory() {

    const [interviews, setInterviews] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getMyInterviews = async () => {
            try {
                const result = await axios.get(
                    import.meta.env.VITE_SERVER_URL + "/api/interview/get-interview"
                    , { withCredentials: true })
                console.log(result.data)
                setInterviews(result.data)

            } catch (error) {
                console.log(error)

            }

        }
        getMyInterviews();

    }, [])


    return (
        <div className='min-h-screen bg-linear-to-br from-gray-50
     to-emerald-200 py-10'>
            <div className='w-[90vw] lg:w-[70vw] mx-auto'>
                <div className='mb-10 w-full flex items-stars gap-4
             flex-wrap'>
                    <button
                        onClick={() => navigate("/")}
                        className='mt-1 p-3 rounded-full bg-white
                 shadow hover:shadow-md transition cursor-pointer hover:bg-emerald-300'>
                        <FaArrowLeft size={20} className='text-gray-600 ' />

                    </button>

                    <div>

                        <h1
                            className='text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent flex-nowrap tracking-wide'
                            style={{ fontFamily: "'Syne', sans-serif" }}
                        >
                            Interview History
                        </h1>
                        <p className='text-gray-500 mt-2'>
                            Track your past interviews and performance reports
                        </p>
                    </div>

                </div>

                {interviews.length === 0 ?
                    <div className='bg-white p-10 rounded-2xl shadow text-center'>
                        <p className='text-gray-500'>
                            No interviews found.Start your first interview.
                        </p>

                    </div> :

                    <div className='grid gap-6 '>
                        {interviews.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => navigate(`/report/${item._id}`)}
                                className='bg-white p-6 rounded-2xl shadow-md hover:shadow-xl
                 transition-all duration-300 cursor-pointer border border-gray-100  border-2 border-transparent hover:border-emerald-500'>
                                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 '>
                                    <div>
                                        <h3 className='text-lg font-semibold text-gray-800'>
                                            {item.role}
                                        </h3>
                                        <p className='text-cyan-500 text-sm mt-1'>
                                            {item.experience}.{item.mode}
                                        </p>
                                        <p className='text-sm mt-2 text-emerald-400 font-bold '>
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </p>

                                    </div>

                                    <div className='flex items-center gap-6'>
                                        <div className='text-right'>
                                             <p className='text-lg text-indigo-500 '>
                                                Overall Score
                                            </p>

                                            <p className='text-xl font-bold text-emerald-600'>
                                                {item.finalScore || 0}/10
                                            </p>
                                           

                                        </div>
                                        <span className={`px-4 py-1 rounded-full text-xs font-medium ${item.status === "completed"
                                            ? "bg-emerald-200 text-emerald-400"
                                            : "bg-yellow-200 text-yellow-400"
                                            }`}>
                                            {item.status}

                                        </span>

                                    </div>


                                </div>

                            </div>

                        ))

                        }

                    </div>}

            </div>

        </div>
    )
}

export default InterviewHistory