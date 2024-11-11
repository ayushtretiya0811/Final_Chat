import React, { useContext, useEffect, useState } from 'react';
import { chatContext } from '../../context/chatContex';
import { AuthContext } from '../../context/AuthContext';
import { getSender } from '../Config/ChatConfig';
import axios from 'axios';
import Loading from './Loading';
function LeftBottom() {

  const {selectedUsers , setSelectedUsers ,user, chats, setChats} = useContext(chatContext)
  const {token} = useContext(AuthContext)
  const [loggedUser , setLoggedUSer] = useState();
  const [loading , setLoading] = useState(false)
// const changecolore = selectedUsers._id === chat._id
    // Assuming you have a function to fetch user details by their IDs
    // This is a placeholder function. You'll need to implement it based on your backend API.

    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      // console.log("store user",storedUser)
      if (storedUser) {
          setLoggedUSer(storedUser);
          // console.log("loggeg user",setLoggedUSer)
      } else {
          // Handle the case where the user data is not available or correctly formatted
          console.error("User data is not available or correctly formatted.");
      }
 
    }, []);
const fetchChats = async()=>{
  try {
    setLoading(true)
    const config ={
      headers: {
        Authorization: `Bearer ${token}` 
      }
    }
    // const {data} = await axios.get(`http://localhost:3000/api/chat` , config) 
    const {data} = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/chat` , config) 
    setChats(data)
    console.log(data)
    setLoading(false)
  } catch (error) {
    console.log(error)
  }
}
console.log("your selected chat",selectedUsers)
useEffect(() => {
  fetchChats()
  // console.log('selectedUsers updated:', selectedUsers);
}, [selectedUsers]);



    // Check if data is loaded
    if (loading) {
      return <Loading/> // Render a loading indicator
   }
  
    return (
      <>
     
         {loading && <Loading />}
        <div className="container p-2 leftbottomchat  overflow-y-scroll ">
            <div className="conversation flex flex-col gap-1">
    
                 {chats && loggedUser ?
                 (
                  chats.map((chat)=>
                    
                   
                   <div key={chat._id}  className="convo-container bg-slate-50  rounded-3xl  m-1" onClick={() =>setSelectedUsers(chat)} 
                   style={{backgroundColor:selectedUsers && selectedUsers._id ===chat._id  ? '#515870' : "#E5E7EB" }}>

                         <p className="convo-icon">
                         {!chat.isGroupChat && chat.users && chat.users.length > 0 ?
                getSender(loggedUser, chat.users).charAt(0) // Show the sender's name
              :
                chat.chatname.charAt(0) // Show the group name
              }
            </p>
            <p className="convo-name text-sm sm:text-lg">
              {!chat.isGroupChat && chat.users && chat.users.length > 0 ?
                getSender(loggedUser, chat.users) // Show the sender's name
              :
                chat.chatname // Show the group name
              }
            </p>{/* Safely access the name property */}
                        {/* <p className="convo-chats">Hello, what is your name?</p> */}
                    </div>
                  )
                  ):
                  null
              
                    }
                  
          
            </div>
        </div>
        </>
    );
}

export default LeftBottom;