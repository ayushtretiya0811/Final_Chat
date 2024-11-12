import { Avatar } from '@nextui-org/react'
import React, { useContext } from 'react'
import { chatContext } from '../../context/chatContex';
import { getSender, getSenderFull } from '../Config/ChatConfig';
import { AuthContext } from '../../context/AuthContext';
import ProfileModal from './ProfileModal';
import { RiArrowGoBackFill } from "react-icons/ri";

function RightTop() {
  const { selectedUsers , setSelectedUsers } = useContext(chatContext);
  const {user:loggedUser} = useContext(AuthContext)
  const displayName = !selectedUsers.isGroupChat ? getSender(loggedUser, selectedUsers.users) : selectedUsers.chatname;
  const oppositeUser  = getSenderFull(loggedUser , selectedUsers.users)
  console.log('Logged User:', loggedUser);
  console.log('Oposite User:', oppositeUser);
console.log('Users in Conversation:', selectedUsers.users);
console.log("selecteduser in profile modal", selectedUsers)
const handleBackButtonClick = () => {
  setSelectedUsers(null); // Clear selected user
};
  return (
   <>
   <div className="chat-top rounded-2xl  bg-slate-300">

   <div className="container text-center  p-4 flex  justify-between items-center ">
    <div className="user-profile-left items-center flex">
      <ProfileModal user={oppositeUser } isGroupChat={selectedUsers.isGroupChat} >

          <Avatar isBordered radius="md" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
      </ProfileModal>
    <div className=' flex flex-col ps-6 text-left'>

    <p className="font-bold ">{displayName}</p>
    <p className="text-xs">Online</p>
    </div>
    </div>
    <div className='text-2xl' >
    <RiArrowGoBackFill onClick={handleBackButtonClick} />
    </div>
   </div>

   </div>
   </>
  
)
};

export default RightTop