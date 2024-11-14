import React, { createContext, useState, useContext } from 'react';

// Create a new context for login
const LoginContext = createContext();

// Provider component to manage login state
export const LoginProvider = ({ children }) => {
  const [loginId, setLoginId] = useState(""); // State to store the loginId
  const [loginPassword, setLoginPassword] = useState(""); // State to store the loginPassword

  return (
    <LoginContext.Provider value={{ loginId, setLoginId, loginPassword, setLoginPassword }}>
      {children}
    </LoginContext.Provider>
  );
};

// Custom hook to use LoginContext
export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};
