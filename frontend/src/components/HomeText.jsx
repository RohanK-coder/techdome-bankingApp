import React from 'react'
import Typewriter from 'typewriter-effect';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function HomeText() {
  const navigate = useNavigate();
  const navigateToAdmin = ()=>{
    navigate('/adminlogin')
  }
  return (
    <div className='home-text'>
      <Typewriter className="text-9xl"
        onInit={(typewriter) => {
        typewriter.typeString('banking made easy')
        .callFunction(() => {
        console.log('String typed out!');
        })

        .start();
        }}
        />
      <div>




        <button className="btn btn-active mr-5"><Link to={'/signin'}>customer login / signup<span>&#8594;</span></Link></button>
        <button  className="btn btn-active bg-red-500 text-black" onClick={navigateToAdmin}>Admin Login Here</button>
      </div>



    </div>
  )
}
