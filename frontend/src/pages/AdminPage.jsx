import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to import axios

export default function AdminPage() {
  const [loans, setLoans] = useState([]);
  const [message, setMessage] = useState(''); // Handle error messages

  // Fetch loans when the component mounts
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get(`http://13.233.199.127:5555/loans`);
        if (response.status === 200) {
          setLoans(response.data); // Store the loans in state
        }
      } catch (error) {
        console.error('Error fetching loans:', error);
        setMessage('Failed to fetch loans.');
      }
    };

    fetchLoans();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Handle status change for a specific loan
  const handleChangeStatus = async (loanId) => {
    try {
      // Here we use the _id to make the API call
      const response = await axios.put(`http://13.233.199.127:5555/loans/${loanId}/status`);
      if (response.status === 200) {
        // Update the status of the loan in the state
        const updatedLoan = response.data;

        // Update the loans state to reflect the status change
        setLoans((prevLoans) =>
          prevLoans.map((loan) =>
            loan._id === updatedLoan._id ? { ...loan, status: updatedLoan.status } : loan
          )
        );
      } else {
        setMessage('Failed to change status.');
      }
    } catch (error) {
      console.error('Error changing status:', error);
      setMessage('Failed to change status.');
    }
  };

  return (
    <div className='admin-dashboard'>
      <h1  className='p-3 gap-4 m-3 rounded-md text-3xl '>Admin Dashboard</h1>
      <div className="bg-neutral-600 text-white">
      {/* Display message if there's an error */}
      {message && <p>{message}</p>}



      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>User Id</th>
            <th>Amount</th>
            <th>Term</th>
            <th>Status</th>
            <th>Weekly Payments - Weeks</th>
            <th>Date Requested</th>
            <th>Change Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Dynamically render loans */}
          {loans.length > 0 ? (
            loans.map((loan) => (
              <tr key={loan._id}> {/* Use _id as the unique key */}
                <td>{loan._id}</td> {/* Display _id instead of id */}
                <td>{loan.id}</td>
                <td>{loan.amount}</td>
                <td>{loan.term}</td>
                <td>{loan.status}</td>
                <td>
                  {`${Math.round(loan.amount / loan.term)} per month - ${Math.round(loan.amount / loan.term) / 4} per week`}
                </td>

                <td>{loan.date}</td>

                <td>
                  <button
                    className="bg-green-300 text-black rounded-md p-2"
                    onClick={() => handleChangeStatus(loan._id)} // Trigger the status change with _id
                  >
                    Change Status
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No loans found for this user.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
}
