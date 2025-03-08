import React, { useEffect } from 'react'
import '../styles/landing.css'
//import {PiStudent} from 'react-icons/pi'
//import {FaHandHoldingWater} from 'react-icons/fa'
//import {MdHealthAndSafety} from 'react-icons/md'
import {useNavigate} from 'react-router-dom'

const Landing = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    if (localStorage.getItem("usertype") === 'freelancer'){
      navigate("/freelancer")
    } else if (localStorage.getItem("usertype") === 'client'){
      navigate("/client")
    } else if (localStorage.getItem("usertype") === 'admin'){
      navigate("/admin")
    }
  })


  return (
    <div className="landing-page">

        <div className="landing-hero">

            <div className='landing-nav'>
              <h3>Freelance Finder</h3>
              <button onClick={()=> navigate('/authenticate')} >Sign In</button>
            </div>

            <div className="landing-hero-text">

                <h1>Unlock Your Potential: Thrive with Freelance Finder</h1>
                <p>Explore endless opportunities and elevate your freelancing career with Freelance Finder. Showcase your expertise, fuel your passion, and connect with businesses that value exceptional talent. Join a vibrant marketplace where innovation meets ambition—your journey to success starts here. </p>
                <button onClick={()=> navigate('/authenticate')}>Get Started</button>
            </div>

        </div>

    </div>
  )
}

export default Landing