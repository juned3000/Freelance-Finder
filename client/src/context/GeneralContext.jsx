import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import socketIoClient from 'socket.io-client';

export const GeneralContext = createContext();

const GeneralContextProvider = ({children}) => {
  const WS = 'http://localhost:5000';
  const socket = socketIoClient(WS);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');

  // Login Function
  const login = async () => {
    const loginInputs = { email, password };
  
    // Validate if email and password are provided
    if (!email || !password) {
      alert('Please provide both email and password');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/login', loginInputs);
  
      // Assuming successful login, destructure response
      const { _id, usertype, username, email } = response.data;
  
      // Clear previous session data in case of re-login
      localStorage.clear();  // Optional, if you want to clear any previous data before saving new ones
  
      // Save user data to localStorage
      localStorage.setItem('userId', _id);
      localStorage.setItem('usertype', usertype);
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
  
      // Navigate based on user type
      if (usertype === 'freelancer') {
        navigate('/freelancer');
      } else if (usertype === 'client') {
        navigate('/client');
      } else if (usertype === 'admin') {
        navigate('/admin');
      }
    } catch (error) {
      // More descriptive error handling based on error response
      if (error.response) {
        // Server responded with a status other than 2xx
        alert(error.response.data.error || 'Login failed');
      } else {
        // No response received (e.g., network issue)
        alert('An error occurred. Please try again later.');
      }
      console.error(error);
    }
  };
  

  // Register Function
  const register = async () => {
    const inputs = { username, email, usertype, password };
    console.log('Register inputs:', inputs);  // Log the data being sent
  
    try {
      const response = await axios.post('http://localhost:5000/register', inputs);
      console.log('Registration successful:', response.data);
      // Proceed with your logic after successful registration...
    } catch (error) {
      // Log the full error response from the backend
      if (error.response) {
        console.error('Backend error response:', error.response.data);
        alert(`Registration failed: ${error.response.data.error}`);
      } else {
        console.error('Request error:', error);
        alert('Registration failed!');
      }
    }
  };
  

  // Logout Function
  const logout = async () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <GeneralContext.Provider value={{
      socket,
      login,
      register,
      logout,
      username,
      setUsername,
      email,
      setEmail,
      password,
      setPassword,
      usertype,
      setUsertype
    }}>
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
