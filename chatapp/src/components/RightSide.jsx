import React, { useContext, useEffect, useRef } from 'react'
import RightTop from './parts/RightTop'
import Chat from './parts/Chat'
import ChatInput from './parts/ChatInput'
import { chatContext } from '../context/chatContex';
import { io } from 'socket.io-client';

function RightSide() {
  const { selectedUsers, setSelectedUsers, socket } = useContext(chatContext);

  // console.log(selectedUsers)
  useEffect(() => {
    if (selectedUsers) {
        socket.emit('join room', selectedUsers._id); // Join the room when selectedUsers changes
    }
}, [selectedUsers, socket]);

  return (
 <>

 {selectedUsers && selectedUsers.users && selectedUsers.users.length > 0 ? (
<div className="rightmain  flex flex-col h-full gap-5 md:flex  "  >
      <div className="r-top">
        <RightTop  />
      </div>
      <div className="r-mid  grow overflow-y-auto  bg-img-chat"  style={{ maxHeight: 'calc(100vh - 200px)' }}>
        <Chat selectedUsers={selectedUsers}/>
      
      </div>
      <div className="r-input pb-2 ">
        <ChatInput  selectedUsers={selectedUsers}/>
      </div>
 </div>

 ):(
  <>
  <div className='bg-no-chat-selected h-full'>

  </div>

  </>

 )}

 </>
  )
}

export default RightSide