import React, { useState } from "react";
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from "motion/react";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { useDispatch } from "react-redux";

import { auth, provider } from "../utils/firebase";
import { setUserData } from "../redux/userSlice";

const ServerUrl = import.meta.env.VITE_SERVER_URL;

function Auth({ isModel = false }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);

      const response = await signInWithPopup(auth, provider);

      const user = response.user;
      const name = user?.displayName;
      const email = user?.email;
      const idToken = await user.getIdToken();

      const result = await axios.post(
        `${ServerUrl}/api/auth/google`,
        { name, email, idToken },
        { withCredentials: true }   // important for cookies
      );

      // console.log(result.data);
      dispatch(setUserData(result.data.user || result.data));

    } catch (error) {
      console.error("Google Auth Error:", error);
      dispatch(setUserData(null));
    }
  };
  return (
    <div className={`w-full ${isModel ? "py-4" : "min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20"}`}>
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05 }}
        className={`w-full ${isModel ? "max-w-md p-8 rounded-3xl" : "max-w-lg p-12 rounded-[32px]"} bg-white shadow-2xl border border-gray-200`}>
        <div className='flex item-center justify-center gap-3 mb-6'>
          <div className='bg-black text-white p-2 rounded-lg'>
            <BsRobot size={18} />


          </div>
          <h2 className='font-semibold text-lg'>InterviewIQ.AI</h2>

        </div>
        <h1 className='text-2xl md:text-3xl font-semibold text-center leading-snug mb-4'>
          Continue With
          <span className='bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2'>
            <IoSparkles size={16} />
            AI Smart Interview
          </span>
        </h1>
        <p className='text-gray-500 text-center text-sm md:text-base leading-relaxed mb-8'>
          Sign in to start AI-powered mock interviews , track your prograss , and unlock detailed performance insights.
        </p>
        <motion.button
          onClick={handleGoogleAuth}
          whileHover={{ opacity: 0.8, scale: 1.03 }}
          whileTap={{ opacity: 1, scale: 0.98 }}
          style={{ cursor: 'pointer' }}
          className='w-full flex items-center justify-center gap-3 py-3 bg-black text-white rounded-full shadow-md'>
          <FcGoogle size={20} />
          Continue with Google


        </motion.button>
        <motion.button
          whileHover={{ opacity: 0.8, scale: 1.03 }}
          whileTap={{ opacity: 1, scale: 0.98 }}
          style={{ cursor: 'pointer' }}
          className='w-full flex items-center justify-center gap-3 py-3 bg-black text-white rounded-full shadow-md'>
          <FaLinkedin size={20} />
          Continue with LinkDin


        </motion.button>
        <motion.button
          whileHover={{ opacity: 0.8, scale: 1.03 }}
          whileTap={{ opacity: 1, scale: 0.98 }}
          style={{ cursor: 'pointer' }}
          className='w-full flex items-center justify-center gap-3 py-3 bg-black text-white rounded-full shadow-md'>
          <FaGithub size={20} />
          Continue with GitHub


        </motion.button>

      </motion.div>

    </div>
  );
}

export default Auth;