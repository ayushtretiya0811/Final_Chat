// context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);

 // Function to set token in Axios headers
 const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
 };

 const registerUser = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      // const response = await axios.post(`http://localhost:3000/api/auth/register`, { name, email, password });
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/auth/register`, { name, email, password },
        {
          Headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response && response.data.success) { // Check if response and response.data exist
        const { user, token } = response.data;
        setUser(user);
       
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        console.log('User data to store:', user);
console.log('Token to store:', token);
        setAuthToken(token);
        navigate('/login')// Throw an error if response or response.data is undefined
      } else {
        toast.error(response.data.message)
        // throw new Error('Registration failed');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during registration');
    }
    setLoading(false);
 };

 const loginUser = async (email, password) => {
  setLoading(true);
  setError(null);
  try {
      // const response = await axios.post(`http://localhost:3000/api/auth/login`, { email, password });
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/auth/login`, { email, password });
      if (response && response.data.success) { // Assuming a successful login returns a 200 status code
          const { user, token } = response.data;
     
          setUser(user);
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', token);
          setAuthToken(token);
          // Redirect to chat page only if login is successful
          navigate('/chat');
      } else {
          // Handle unsuccessful login, e.g., by setting an error message
          toast.error(response.data.message )
          setError("Login failed. Please check your credentials.");
      }
  } catch (err) {
    toast.error('somthing went wrong here')
      // Handle errors, e.g., by setting an error message
      setError(err.response.data.message || "An error occurred during login");
  } finally {
      setLoading(false);
  }
};
 const logoutUser = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];

   };
   
 const token = localStorage.getItem('token');

 // Check if user is already logged in
 useEffect(() => {

    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
          const user = JSON.parse(userData);
          setUser(user);
          setAuthToken(token);
      } catch (error) {
          console.error("Error parsing user data:", error);
      }
  }
}, []);

 return (
    <AuthContext.Provider value={{ user, loading, error,token, registerUser, logoutUser, loginUser }}>
      {children}
    </AuthContext.Provider>
 );
};