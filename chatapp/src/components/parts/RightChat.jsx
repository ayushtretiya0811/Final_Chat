import React from 'react'
import { IoSend } from 'react-icons/io5'
import { getSender } from '../Config/ChatConfig';

function RightChat(
  {messages,  loggeduser}
) {
  const sender = getSender(loggeduser, messages)
  const senderMessages = messages.filter((message) => message.sender._id === loggeduser);
  return (
 <>
{senderMessages.map((message) => (
<div class="flex items-end  sm:max-w-xl justify-end mb-4"  key={message._id}>

  <div class="bg-blue-500 rounded-lg p-3 text-white">

    <div class="text-sm">{message.content}</div>
  </div>


  <img src="sender-avatar.jpg" alt="Sender Avatar" class="w-8 h-8 rounded-full ml-2" />
</div>

))}
 </>
  )
}

export default RightChat