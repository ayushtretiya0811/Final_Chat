import React, { useState } from 'react'
import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    useDisclosure,
    Button,
    Input,
    Chip,
    User
  } from "@nextui-org/react";
import axios from 'axios';
import { chatContext } from '../../context/chatContex';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';
function Creategroup( {children}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupName, setGroupName] = useState('');
    const [ selectedUsers, setSelectedUsers  ]  = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    // const [selectedUsers, setSelectedUsers] = useState([]);
    const { chats, setChats  } = useContext(chatContext);
    const {token ,user} = useContext(AuthContext)
    const [IsLoading , setIsLoading] = useState(false)
   // Access addGroup from context

   // Ensure you have the token available here

   const handleSearch = async () => {
   
    try {
      // const {data} = await axios.get(`http://localhost:3000/api/auth/alluser?search=${searchQuery}`, {
      const {data} = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/auth/alluser?search=${searchQuery}`, {
      headers: {
        Authorization: `Bearer ${token}` // Assuming you have the token available
      }
    });
      // Update the search results state
      setSearchResults(data)
      console.log(data)
      setIsLoading(false); // Hide loading indicator
  } catch (error) {
      console.error("Error fetching users:", error);
      setIsLoading(false); // Hide loading indicator
  }
}
    const handleUserSelection = (userWillAdd) => {
      if(selectedUsers.includes(userWillAdd))
        {
          toast.error("user already exist")
        }
        setSelectedUsers([...selectedUsers, userWillAdd])
    };
  
   const handleClose=(userToDelet) =>{
      setSelectedUsers(selectedUsers.filter((sel)=> sel._id !== userToDelet._id))
   }
    
    // Update the state with the new array

  
   
    const handleCreateGroup = async () => {
          if(!groupName || !selectedUsers)
            {
              toast.error("please fill th details")
            }
            try {
              const config ={
                headers: {
                  Authorization: `Bearer ${token}` 
                }
              }
              // const {data }= await axios.post(`http://localhost:3000/api/chat/group`, {
              const {data }= await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/chat/group`, {
                name : groupName,
                users :selectedUsers.map((u)=> u._id)
              }, config)
              setChats([data, ...chats])
              onClose()
              toast.success("Group has been Created Successfully")
            } catch (error) {
              console.log(error)
            }
    };
   
  
  return (
<>
{
children ? ( <span onClick={onOpen}  >{children}</span>  ):( <span onClick={onOpen} >EYES</span> )
}

<Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
              <div  className="flex w-full flex-wrap  mb-6 md:mb-0 gap-4">
          <Input type="text" variant="flate" label="Group Name" value={groupName} onChange={(e) => setGroupName(e.target.value)}  />
          <Input type="text" variant="flate" label="user name"  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={handleSearch} />
       
        <div className="flex flex-wrap gap-2">
        {selectedUsers.map((user, index) => (
        <Chip key={index} onClose={() => handleClose(user)} variant="flat">
          {user.name}
        </Chip>
      ))}
    </div>
    {searchResults.map((user, index) => (
    <div className="">
    <User   
      name=   {user.name}
      description="Product Designer"
      avatarProps={{
        src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
      }}
      key={index}
      onClick={() => handleUserSelection(user)}
    />
    </div>
     ))}
        </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleCreateGroup}>Create Group
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

</>
  )
   }

export default Creategroup