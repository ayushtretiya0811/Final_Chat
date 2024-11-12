// import { Button, TextField } from '@mui/material/Button'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {StyledButton} from '../components/style'
import {StyledTextField} from '../components/style'
import { toast } from 'react-hot-toast';
import axios from "axios";
// import Loader from './Loader';
import Loading from '../components/parts/Loading'
import { Input } from '@nextui-org/react';
import { Fingerprint } from '@mui/icons-material';
import { chatContext } from '../context/chatContex';
import { AuthContext } from '../context/AuthContext';
function Register() {
  const { registerUser, loading, error } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
    // console.log(name,email, password );
   
    const SubmitRegister = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
          toast.error("Please fill in all fields.");
          return;
      }
      // if(!password.length < 5) {
      //   toast.error("Password must be at least 5 characters long.");
      //   return;
      // }
    await registerUser(name ,email, password);
   
      }



  return (
   <>
   <div>

    {loading && <Loading />}
   </div>
   <div className="main-auth bg-img-login">
    <div className="register ">
        <h1 className='text-2xl font-bold p-2  '>Registration</h1>
            <form onSubmit={SubmitRegister}>
        <div className="regi-form ">

        
           <div  className=" input-reg flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
       
          <Input type="name" variant="underlined" label="Name"   onChange={(e) => setName(e.target.value)}  value={name} 
          onFocus={(e) => e.target.parentElement.style.color = 'blue'} 
          onBlur={(e) => e.target.style.color = ''} />
       

          <Input type="email" variant="underlined" label="Email"    onChange={(e) => setEmail(e.target.value)}
          
          value={email} />
      

          <Input type="password" variant="underlined" label="Password"     onChange={(e) => setPassword(e.target.value)}
       
       value={password} />
        </div>
       
        {/* <button> */}
        <button type='submit' className='reg-from-input auth-button p-8' variant="contained" color="success" 
       
       >
<Fingerprint  sx={{ fontSize: 40 , ":hover": { color: "green"}  } }  />
    <span className="ms-2">Register</span>
       </button>
   
        {/* </button> */}
        
        
           </div>
       </form>
       <div className='flex space-x-3 text-center justify-center items-center'>

        <p>Already have an account?</p>
        <Link to="/login" className='text-md font-bold'  >Login</Link>
       </div>
    </div>
   </div>



   </>
  )
}

export default Register