import React from 'react'

function LeftChat({messages, loggeduser}) {
  if (!messages) {
    return null; // or return a loading state or a default message
  }
  messages.forEach(message => {
    const me = message.sender._id;
    console.log("chat message", me);
 });
 const filteredMessages = messages.filter(mess => mess.sender && mess.sender._id !== loggeduser).reverse();
  return (
  <>
   {filteredMessages.map(mess => (


  <div key={mess._id} class="flex items-start sm:max-w-xl justify-start mb-4">

  <img src="receiver-avatar.jpg" alt="Receiver Avatar" class="w-8 h-8 rounded-full mr-2" />


  <div class="bg-gray-200 rounded-lg p-3">

    <div class="font-semibold text-gray-800">{mess.sender.name}</div>
  
    {/* <div class="font-semibold text-gray-800"></div> */}
    <div class="text-sm text-gray-700">{mess.content}</div>
  </div>
</div>
  ))
}
  </>
  )
}

export default LeftChat