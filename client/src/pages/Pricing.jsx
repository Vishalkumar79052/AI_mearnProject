import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react";
import { FaCheckCircle } from "react-icons/fa";
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Pricing() {
  const [SelectedPlan, setSelectedPlan] = useState("free");
  const [loadingPlan , setLoadingPlan] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "0",
      credits: 100,
      description: "Perfect for beginners starting interview preparation.",
      features: [
        "100 AI Interview Credits",
        "Basic Performance Report",
        "Voice Interview Access",
        "Limited History Tracking",
      ],
      default: true,
    },
    {
      id: "basic",
      name: "Starter Pack",
      price: "100",
      credits: 200,
      description: "Great for focused and skill improvement.",
      features: [
        "200 AI Interview Credits",
        "Detailed Feedback",
        "Performance Analytics",
        "Full Interview History",
      ],
    },
    {
      id: "pro",
      name: "Pro Pack",
      price: "250",
      credits: 500,
      description: "Best value for serious job preparation.",
      features: [
        "500 AI Interview Credits",
        "Advanced Trend Analysis",
        "Priority AI Processing",
      ],
      badge: "Best Value",
    },
  ]

  const handlePayment = async (plan) => {
    try {
      setLoadingPlan(plan.id)
     const amount = plan.id === "basic" ? 100 : plan.id === "pro" ? 250 : 0;

      const result = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/api/payment/order" , {
          planId : plan.id,
          amount:amount,
          credits:plan.credits,
        },{withCredentials:true}
      )
      // console.log(result.data)

      const option = {
        key:import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount:result.data.amount,
        currency:"INR",
        name:"InterviewIQ.AI",
        description:`${plan.name} - ${plan.credits} Credits`,
        order_id:result.data.id,

        handler:async function (response){
          // console.log(response)
          const Verifypay = await axios.post(
             import.meta.env.VITE_SERVER_URL + "/api/payment/verify" , response , {withCredentials:true}

          )
          dispatch(setUserData(Verifypay.data.user));
          alert("Payment Successful 👍 Credits Added !");
          navigate("/");
          
        },
        theme:{
          color:"#10b981",
        },
      }

      const rzp = new window.Razorpay(option)
      rzp.open()
      setLoadingPlan(null)
      
    } catch (error) {
      console.log(error)
      setLoadingPlan(null)
      
    }
  }


  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-emerald-200 py-16 px-6'>
      <div className='max-w-6xl mx-auto mb-14 flex items-start gap-4'>

        <button
          onClick={() => navigate("/")}
          className='mt-2 p-3 rounded-full bg-white shadow hover:shadow-md transition cursor-pointer hover:bg-emerald-700'>
          <FaArrowLeft className='text-cyan-400' />


        </button>

        <div className='text-center w-full'>
          <h1 className='text-cyan-500 text-4xl font-bold'>
            Choose Your Plane
          </h1>
          <p className='text-cyan-800 mt-3 text-lg'>
            Flexible pricing to match your interview preparation goals.
          </p>

        </div>

      </div>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
        {plans.map((plan) => {
          const isSelected = SelectedPlan === plan.id
          return (

            <motion.div
              key={plan.id}
              whileHover={!plan.default && { scale: 1.05 }}
              onClick={() => !plan.default && setSelectedPlan(plan.id)}
              className={`relative rounded-3xl p-8 transition-all duration-300 border 
            ${isSelected ? "border-emerald-600 shadow-2xl bg-white" : "border-gray-200 bg-white shadow-md"
                }
            ${plan.default ? "cursor-default" : "cursor-pointer"}
            `}>
              {/* badge  */}
              {plan.badge && (
                <div className='absolute top-6 right-6 bg-emerald-600 text-cyan-300 text-xs px-4 py-1 rounded-full shadow'>
                  {plan.badge}

                </div>


              )}
              {/* // DEFAULT TAG */}
              {plan.default && (
                <div className='absolute top-6 right-6 bg-emerald-200 text-green-700 text-xs px-3 py-1 rounded-full'>Default

                </div>
              )}

              {/* plan Name */}
              <h3 className='text-xl font-semibold text-cyan-400 '>
                {plan.name}
              </h3>

              {/* price */}
              <div className='mt-4'>
                <span className='text-cyan-600 text-3xl font-bold '>
                  {plan.price}

                </span>
                <p className='text-green-400 mt-1'>
                  {plan.credits} Credits
                </p>
              </div>

              {/* Description */}
              <p className='text-cyan-400 mt-4 text-sm leading-relaxed'>
                {plan.description}
              </p>

              {/* FEATURES */}
              <div className='mt-6 space-y-3 text-left'>
                {plan.features.map((feature, i) => (
                  <div key={i}
                    className='flex items-center gap-3'>
                    <FaCheckCircle className='text-emerald-500 text-sm' />
                    <span className='text-gray-500 text-sm'>
                      {feature}
                    </span>


                  </div>
                ))}
              </div>
              {!plan.default && 
              <button 
              disabled = {loadingPlan === plan.id}
              onClick={(e)=>{e.stopPropagation();
                if(!isSelected){
                  setSelectedPlan(plan.id)
                }else{
                  handlePayment(plan)
                }
              }}
              className={`w-full mt-8 py-3 rounded-xl font-semibold transition ${
                isSelected ? "bg-emerald-600 text-white hover:opacity-90 cursor-pointer":"bg-gray-200 text-gray-800 hover:bg-emerald-100"
              }`}>
                {loadingPlan === plan.id ? "Processing..." :
                isSelected ? "Proceed to Pay":"Select Plan"}

              </button>
              }

            </motion.div>
          )
        })}

      </div>

    </div>
  )
}

export default Pricing