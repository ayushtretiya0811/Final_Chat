// import {     Button, TextField, styled } from '@mui/material'
import React, { useContext, useState } from 'react'


import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import axios from "axios";
import Loading from '../components/parts/Loading';
import { chatContext } from '../context/chatContex';
import { Input } from '@nextui-org/react';
import { AuthContext } from '../context/AuthContext';
import { Fingerprint } from '@mui/icons-material';

function Login() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    // const [isLoading, setIsLoading] = useState(false);
    const { loginUser, loading, error } = useContext(AuthContext);
   

   const SubmitLogin = async (e) => {
    // setLoading(true)
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
  }
    await loginUser(email, password);
    
       }

          

  return (
    <>
      <div>
      {loading && <Loading />}
      {/* Your login/register form here */}
    </div>
    <div className="main-auth bg-img-login">
    <div className="register">
        <h1 className='text-4xl font-bold p-2  uppercase'>Login</h1>
       <form onSubmit={SubmitLogin}>
        <div className="regi-form">

        <div  className=" input-reg flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
       
     
    

       <Input type="email" variant="underlined" label="Email"  className='inp'
      
        onChange={(e) => setemail(e.target.value)}
       
       value={email} />
   

       <Input type="password" variant="underlined" label="Password"      onChange={(e) => setpassword(e.target.value)}
    
    value={password} />
     </div>
      <button className='p-5' aria-label="fingerprint" type='submit' color="success">
      <Fingerprint sx={{ fontSize: 40 , ":hover": { color: "green"}  } }/>

</button>
 {/* </button> */}
       
        
        
           </div>
 </form>
 <div className='flex space-x-3 text-center justify-center items-center'>

        <p>Don't have an account?</p>
        <Link to="/" className="auth-link text-md  " >Register</Link>
 </div>
    </div>
   </div>

 

    </>
  )
}

export default Login