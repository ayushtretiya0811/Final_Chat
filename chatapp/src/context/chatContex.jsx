import axios from 'axios';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
export const chatContext = createContext();

export const ChatContextProvider = (props) => {
    const [searchResults, setSearchResults] = useState([]);
    const [chats ,setChats] = useState([])
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isFetchingMessages, setIsFetchingMessages] = useState(false);
    const [newMessageReceived, setNewMessageReceived] = useState(false); // New state for tracking new messages
    // const [selectedUsers, setSelectedUsers] = useState(null);
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const ENDPOINT = 'http://localhost:1000';
      
          
        const socketInstance = io(ENDPOINT);
        setSocket(socketInstance);
    
        socketInstance.on('connect', () => {
          console.log('Socket connected');
        });
    
    
        socketInstance.on('new message', (data) => {
          if (data.chatId === selectedUsers?._id) {
              setMessages((prevMessages) => [...prevMessages, data]); // Update state with new message
           
             setNewMessageReceived(true); 
           
          }
      });

    
        return () => {
          socketInstance.disconnect(); 
        
    }
      },[selectedUsers]);
 
      const fetchMessages = async () => {
        if (!selectedUsers || !selectedUsers._id) return;
        try {
   
          const { data: response } = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/message/${selectedUsers._id}`);
          setMessages(response);
     
        } catch (error) {
          console.error('Failed to fetch messages:', error);
        }
     
      };
   

   
    return (
        <chatContext.Provider value={{
            searchResults,
            setSearchResults,
            messages, setMessages, fetchMessages,
            selectedUsers, setSelectedUsers,
            chats ,setChats,socket ,
            newMessageReceived, setNewMessageReceived 
        
        }}>
            {props.children}
        </chatContext.Provider>
    );
};

export const ChatState = () => {
    return useContext(chatContext);
};