import React, { useContext } from 'react'
import RightTop from './parts/RightTop'
import Chat from './parts/Chat'
import ChatInput from './parts/ChatInput'
import { chatContext } from '../context/chatContex';
import { io } from 'socket.io-client';

function RightSide() {
  const {selectedUsers, setSelectedUsers} =  useContext(chatContext);
  // console.log(selectedUsers)

  return (
 <>

 {selectedUsers && selectedUsers.users && selectedUsers.users.length > 0 ? (
<div className="rightmain  flex flex-col h-full gap-5 md:flex  "  >
      <div className="r-top">
        <RightTop/>
      </div>
      <div className="r-mid  grow">
        <Chat selectedUsers={selectedUsers}/>
      </div>
      <div className="r-input pb-2 ">
        <ChatInput  selectedUsers={selectedUsers}/>
      </div>
 </div>

 ):(

  <p>pease select the chat for starting Coneversation</p>

 )}

 </>
  )
}

export default RightSide