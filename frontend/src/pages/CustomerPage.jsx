import React from 'react'
import { useLogin } from '../../context/LoginContext';
import { useState,useEffect } from 'react';
import axios from 'axios';
import './CustomerPage.css'
export default function CustomerPage() {
  const [message, setMessage] = useState('');
  const [loans, setLoans] = useState([]);
  const [amount,setAmount] = useState("");
  const handleAmount = (e)=>{

    setAmount(e.target.value);
    console.log(amount)
  }
  const [term,setTerm] = useState("");
  const handleTerm = (e)=>{

    setTerm(e.target.value);
    console.log(term)
  }
  const { loginId, setLoginId, loginPassword, setLoginPassword } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Basic validation for amount and term
    if (!amount || !term) {
      setMessage('Please provide all fields (Amount and Term).');
      return;
    }

    // Prepare the loan data
    const loanData = {
      amount: parseFloat(amount),  // Ensure it's a number
      term: parseInt(term, 10),    // Ensure it's an integer
    };

    try {
      // Send POST request to the backend API
      const response = await axios.post(`http://13.233.199.127:5555/loans/${loginId}`, loanData);

      if (response.status === 201) {
        // Loan successfully created
        setMessage('Loan request created successfully!');
        alert("Loan request created");

        // Add the new loan to the list of loans (without reloading the page)
        setLoans(prevLoans => [...prevLoans, response.data]); // Add the new loan to the state

        // Optionally, reset the input fields
        setAmount("");
        setTerm("");
      } else {
        // Handle other response statuses
        setMessage('Failed to create loan request.');
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error:', error);
      setMessage('An error occurred while creating the loan request.');
    }
  };

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get(`http://13.233.199.127:5555/loans/${loginId}`);
        if (response.status === 200) {
          setLoans(response.data); // Store the loans in state
        }
      } catch (error) {
        console.error('Error fetching loans:', error);
        setMessage('Failed to fetch loans.');
      }
    };

    // Only fetch loans if loginId is available
    if (loginId) {
      fetchLoans();
    }
  }, [loginId]);


  return (
    <div className='customer'>
      <div className='customer-page'>
      <h1 className='text-3xl mt-5 mb-5'>Customer Id : {loginId}</h1>
      <h4>Enter the details and request a loan</h4>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='amount' value={amount} onChange={handleAmount} className='p-1 gap-4 mr-3 mt-3 mb-3 rounded-md bg-white text-black'/>
        <input type="text" placeholder='term in months' value={term} onChange={handleTerm} className='p-1 gap-4 mr-3 mt-3 mb-3 rounded-md bg-white text-black'/>
        <button type="submit" className='gap-4 mt-3  rounded-mg border-solid bg-red-500 text-white pr-4 pl-4 pt-2 pb-2'>Request loan</button>
      </form>
      <div className="bg-neutral-600 text-black">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Amount</th>
        <th>Term</th>
        <th>Status</th>
        <th>Weekly Payments - Weeks</th>
        <th>Date Requested</th>
      </tr>
    </thead>
    <tbody>
      {/* Dynamically render loans */}
      {loans.length > 0 ? (
              loans.map((loan) => (
                <tr key={loan._id}>
                  <td>{loan.amount}</td>
                  <td>{loan.term}</td>
                  <td>{loan.status}</td>
                  <td>{`${Math.round((loan.amount)/(loan.term)*100/100)} per month - ${(Math.round((loan.amount)/(loan.term)*100/100))/4} per week`}</td>
                  <td>{loan.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No loans found for this user.</td>
              </tr>
            )}


    </tbody>
  </table>
</div>

    </div>
    </div>
  )
}
