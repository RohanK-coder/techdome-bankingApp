import React, { useState } from 'react'
import axios from 'axios';
import { useLogin } from '../../context/LoginContext';
import { useNavigate } from 'react-router-dom';
import './Registration.css'

export default function Registration() {

  const { loginId, setLoginId, loginPassword, setLoginPassword } = useLogin();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // For displaying success or error messages
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic form validation
    if (!id || !password) {
      setMessage("Both ID and Password are required.");
      return;
    }

    const user = {
      id: parseInt(id),  // Ensure the ID is an integer
      password: password,
    };

    try {
      // Send POST request to backend (using axios or fetch)
      const response = await axios.post("http://13.233.199.127:5555/login/users", user); // Change URL as needed

      if (response.status === 201) {
        setMessage("User added successfully! - now please continue with login.");
        alert("User added successfully! - now please continue with login.");
        setId("");  // Clear the form fields
        setPassword("");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      setMessage("Failed to add user. Please try again.");
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    // Basic form validation
    if (!loginId || !loginPassword) {
      setMessage("Both Login ID and Login Password are required.");
      return;
    }

    try {
      const response = await axios.get(`http://13.233.199.127:5555/login/users/${loginId}`)

      if(response.status == 200){
        navigate('/customerpage')
      }
      else{
        alert("loginId not found - please sign up");
      }
    } catch (error) {
      console.log(error.message);
      alert("not found")
    }


  };
  return (
    <div className='registration-form'>
      <div className='login-signup'>
        <div className="login">
        <form onSubmit={handleLogin}>
        <div>
        <h1 className='p-3 gap-4 m-3 rounded-md text-3xl text-white '>Existing Customer </h1>
          <label htmlFor="loginId" className='text-white'>Login ID</label>
          <input
            type="text"
            id="loginId"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}  // Set loginId in context
            placeholder="Enter your login ID"
            required
            className='p-3 gap-4 m-3 rounded-md'
          />
        </div>

        <div>
          <label htmlFor="loginPassword" className='text-white'>Login Password</label>
          <input
            type="password"
            id="loginPassword"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}  // Set loginPassword in context
            placeholder="Enter your password"
            required
            className='p-3 gap-4 m-3 rounded-md'
          />
        </div>

        <div>
          <button type="submit" className='gap-4 m-3 rounded-mg border-solid bg-green-500 text-white pr-4 pl-4 pt-2 pb-2'>Login</button>
        </div>
      </form>
        </div>
        <div className="signup">
        <form onSubmit={handleSubmit}>
        <div>
          <h1 className='p-3 gap-4 m-3 rounded-md text-3xl text-white'>New Customer ? </h1>
          <label htmlFor="id" className='text-white'>User ID</label>

          <input
            type="number"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter user ID"
            required
            className='p-3 gap-4 m-3 rounded-md'
          />
        </div>

        <div>
          <label htmlFor="password" className='text-white'>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            className='p-3 gap-4 m-3 rounded-md'
          />
        </div>

        <div>
          <button type="submit" className='gap-4 m-3 rounded-mg border-solid bg-red-500 text-white pr-4 pl-4 pt-2 pb-2'>Sign Up</button>
        </div>
      </form>
        </div>


      </div>

    </div>
  )
}
