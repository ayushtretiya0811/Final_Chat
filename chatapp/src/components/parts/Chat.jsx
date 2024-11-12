import React, { useContext, useEffect, useRef, useState } from 'react'
import LeftChat from './LeftChat'
import RightChat from './RightChat'
import { chatContext } from '../../context/chatContex'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { isLastmessages, isSameSender } from '../Config/ChatConfig'
import io from 'socket.io-client'

const ENDPOINT = 'http://localhost:1000';
// let socket , selectedChatCompare;

function Chat({selectedUsers}) {
  const {  messages , fetchMessages, setMessages, newMessageReceived, setNewMessageReceived    , socket  } = useContext(chatContext)

  // const [messages, setMessages] = useState([]);
  const {user:loggedUser} = useContext(AuthContext)
  const [socketConnected , setSocketConnected] = useState(false)
  const hasScrolledToBottom = useRef(false); 
  // const [roomID, setRoomID] = useState(null);
  const logUser = loggedUser.id
  console.log("logged user id",logUser)
  const selID =selectedUsers._id 
  console.log("selected id" ,selID)
  const chatEndRef = useRef(null);

  // Initialize socket state
  // useEffect(() => {
  //   // Fetch messages only when selectedUsers changes
  //   if (selectedUsers && selectedUsers._id) {
  //     fetchMessages();
  //   }
  // }, [selectedUsers]); 



  // useEffect(() => {
  //   socket = io(ENDPOINT); // Ensure socket is initialized only once
  //   if (selectedUsers && selectedUsers._id) {
  //     fetchMessages();
  //     // socket.emit('join room', selectedUsers._id);  // Fetch messages when selectedUsers changes
  //   }
  //   socket.on('new message', (data) => {
  //     if (data.chatId === selectedUsers._id) {
  //       setMessages((prevMessages) => [...prevMessages, data]);
  //       fetchMessages();
  //     }
  //   });
  //   return () => {
  //     socket.off('new message'); // Clean up the socket listener
  //   };
  // }, [setMessages, fetchMessages]);
  useEffect(() => {
    const fetchChatMessages = async () => {
      if (selectedUsers && selectedUsers._id) {
        // Clear previous messages when selected user changes
        // Clear messages for the new chat
       
        socket.emit('join room', selectedUsers._id); // Join the room when selectedUsers changes
        await fetchMessages(); // Fetch messages for the new selected user
      }
    };

     fetchChatMessages();
  }, [ newMessageReceived , selectedUsers]);



useEffect(() => {
  if(selectedUsers && selectedUsers._id){
    fetchMessages();
  }
},[selectedUsers , fetchMessages , newMessageReceived]);


  
  // useEffect(() => {


  //   const socket = io(ENDPOINT);
  //   socket.on('connect', () => {
  //     console.log('Socket connected');
  //   });
  //   socket.on('new message', (data) => {
  //     console.log('New message received:', data);
  //     if (data.chatId === selectedUsers) {
  //       setMessages((prevMessages) => [...prevMessages, data]);
 
  //         // Force re-render
  //     }
  //   },)
  //   return () => {
  //     socket.disconnect();
  //   };
    
  // },[] );

  // useEffect(() => {
  //   if (socketConnected &&!initialDataLoaded) {
  //     fetchMessages();
  //     setInitialDataLoaded(true); // Mark initial data as loaded
  //   }
  // }, [socketConnected, initialDataLoaded]);

  // const fetchMessages = async () => {
  //   try {
  //     const {data: response} = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/message/${selectedUsers._id}`);
  //     setMessages(response);
  //     console.log("chat", response)
  //     // setMessages((prevMessages) => [...prevMessages, response]);
    
     
  //   } catch (error) {
  //     console.error('Failed to fetch messages:', error);
  //   }
  // };



  useEffect(() => {
    if (chatEndRef.current && !hasScrolledToBottom.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
      hasScrolledToBottom.current = true; // Set to true after scrolling
    }
  }, [messages, selectedUsers]);



  return (
  <>
   {/* <div class=" my-4   ">
 <div class="flex  items-baseline  flex-col mb-2 ">
          <LeftChat  messages={messages}  loggeduser={logUser} />
        </div>
        <div class="flex items-end flex-col mb-4">
       <RightChat  messages={messages}  loggeduser={logUser}    />
        </div>
      

    </div> */}




      {messages?.map((m , i) => (
        <div key={m._id} className={`flex items-baseline mb-2 ${m.sender?._id === logUser ? 'justify-end' : 'justify-start'}`}>
          <p className={`p-2 rounded ${m.sender?._id === logUser ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
            {m.content}
          </p>
        </div>
      ))}
       <div ref={chatEndRef} /> 
      {/* <div ref={chatEndRef} /> This div will be used to scroll to the bottom */}
  
        {/* This div will be used to scroll to the bottom */}
   
    {/* {messages.map((m, i) =>(

          
<div key={m._id} class="flex  items-baseline  flex-col mb-2 ">
    {
      (isSameSender(messages , m ,i , logUser)) ||
      (isLastmessages(messages ,i , logUser))
      && (
        <p>{m.sender.name}</p>
      )
    }
</div>
)  )
} */}
  </>
  )
}

export default Chat