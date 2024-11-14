import React from 'react'
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
export default function AdminLogin() {
  const navigate = useNavigate();


  const [id,setId] = useState("");
  const [password,setPassword] = useState("");
  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(id);

    if(id=='admin'&& password=="admin"){
      alert("Authenticated Admin");
      navigate('/adminpage')
    }
    else{
      alert("Please check admin credentials")
    }
  }
  return (
    <div className='admin-form'>
      <h1  className='p-3 gap-4 m-3 rounded-md text-3xl '>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="id" id="id" value={id} placeholder='enter admin id' onChange={(e)=>{
          setId(e.target.value);

        }}
        className='p-3 gap-4 m-3 rounded-md'/>
        <input type="password" name="password" id="password" value={password} placeholder='enter password' onChange={(e)=>{
          setPassword(e.target.value);

        }}
        className='p-3 gap-4 m-3 rounded-md'/>
        <button type='submit' className='gap-4 m-3 rounded-mg border-solid bg-red-500 text-white pr-4 pl-4 pt-2 pb-2'>Submit</button>
      </form>
    </div>
  )
}
