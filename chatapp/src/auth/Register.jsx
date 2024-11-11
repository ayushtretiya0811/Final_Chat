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
   <div className="main-auth">
    <div className="register">
        <h1>Register</h1>
            <form onSubmit={SubmitRegister}>
        <div className="regi-form">

        
           <div  className=" input-reg flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
       
          <Input type="name" variant="underlined" label="Name"   onChange={(e) => setName(e.target.value)}  value={name} />
       

          <Input type="email" variant="underlined" label="Email"    onChange={(e) => setEmail(e.target.value)}
          
          value={email} />
      

          <Input type="password" variant="underlined" label="Password"     onChange={(e) => setPassword(e.target.value)}
       
       value={password} />
        </div>
       
        {/* <button> */}
        <button type='submit' className='reg-from-input auth-button' variant="contained" color="success" 
       
       >
<Fingerprint/>
        Register
       </button>
   
        {/* </button> */}
        
        
           </div>
       </form>
        <p>Already have an account?</p>
        <Link to="/login"  >Login</Link>
    </div>
   </div>



   </>
  )
}

export default Register