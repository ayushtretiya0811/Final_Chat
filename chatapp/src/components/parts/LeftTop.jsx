
import React, { useContext } from 'react'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";
import { MdGroups3 } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import SiderMenu from './SiderMenu';
import axios from 'axios';
import Creategroup from './Creategroup';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
function LeftTop( ) {
  const{user ,logoutUser} = useContext(AuthContext)
  const navigate = useNavigate()
  const handleLogout = () => {
   
    logoutUser();
    navigate('/login');
    // Optionally, navigate the user to the login page or homepage
   };
  return (
    <>
<div className="l-top  bg-slate-50 rounded-2xl items-center ">
  <div className="container p-4 ">
    <div className="profile flex  items-center sm:justify-between ">
    <div className="flex  items-center   gap-4">

      <Dropdown placement="bottom-start" backdrop="blur">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              
            }}
            className="transition-transform"
           
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">@{user ?user.email:null}</p>
          </DropdownItem>
          <DropdownItem key="settings">
            My Settings
          </DropdownItem>
         
          <DropdownItem key="logout" onClick={handleLogout} color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div className="l-top-right flex  items-center  gap-5">
<Creategroup>

<MdGroups3 className='sm:h-6 w-6'  />   
</Creategroup>
<div  >

<SiderMenu>

<FaSearch className=' sm:h-5 w-5'  />
</SiderMenu>

</div>
<IoMdPersonAdd className=' sm:h-6 w-6' />


    </div>
    </div>

  </div>
</div>
    
  
    </>
  )
}

export default LeftTop