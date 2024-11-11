
import { useDisclosure } from '@chakra-ui/hooks'
import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, FormLabel, InputGroup, InputRightAddon, Skeleton, Stack } from '@chakra-ui/react'
import { CiSearch } from "react-icons/ci";
// import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import UserSearch from './UserSearch';
import { chatContext } from '../../context/chatContex';
import { Avatar } from '@nextui-org/react';

function SiderMenu({ children}) {
  const { setSearchResults , searchResults  , setSelectedUsers ,chats,setChats } = useContext(chatContext); 
  const [IsLoading , setIsLoading] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [searchResult, setSearchResult] = useState('');
  const [hasSearched, setHasSearched] = useState(false); 
  const { token } = useContext(AuthContext);
  // const [seeResults, setSeeResults] = useState([]);x
  // const { setSelectedUsers } = useContext(chatContext);
  // const { setSearchResults } = useContext(chatContext);


 
  const handlesearch = async () => {
    setIsLoading(true); 
    setHasSearched(true); // Show loading indicator
    try {
        // const response = await axios.get(`http://localhost:3000/api/auth/alluser?search=${searchResult}`, {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/auth/alluser?search=${searchResult}`, {
            headers: {
                Authorization: `Bearer ${token}` // Assuming you have the token available
            }
        });
        setSearchResults(response.data); // Update the search results state
        setIsLoading(false); // Hide loading indicator
    } catch (error) {
        console.error("Error fetching users:", error);
        setIsLoading(false); // Hide loading indicator
    }
};
  const handleUserSelection = async (userId) => {
    
    try {
      setIsLoading(true);
      const config= {
        headers: {
          "Content-type":"application/json",
          Authorization: `Bearer ${token}` // Assuming you have the token available
        }
      }
      // const {data} =await axios.post(`http://localhost:3000/api/chat` , {userId} , config) 
      const {data} =await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/chat` , {userId} , config) 
      if(!chats.find((c) =>c._id === data._id ) )setChats([data, ...chats])
      setSelectedUsers(data)
   console.log("your user slection ",data)
   onClose()
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
    //    const userexist = selectedUsers.some(user=> user._id === selectedUser._id);
//    if (!userexist) {
//     setSelectedUsers(prevUsers => [...prevUsers, selectedUser]);
//     onClose();
// } else {
//     onClose();
//     console.log('User already exists in the selected users list.');
// }


  
  // Your existing component logic and JSX...
  // const handleUserSelection = (selectedUser) => {
  //   console.log('Before update:', selectedUsers);
  //   const userExists = selectedUsers.some(user => user._id === selectedUser._id);
  //   if (!userExists) {
  
  //     setSelectedUsers(prevUsers => [...prevUsers, selectedUser]);
      
  //     onClose();
  //  } else {
  //   onClose();
  //     console.log('User already exists in the selected users list.');
  //  }
  // };




  return (
    <>

{
children ? ( <span onClick={onOpen}  >{children}</span>  ):( <span onClick={onOpen} >EYES</span> )
}
<Drawer
        isOpen={isOpen}
        placement='left'
        size="sm"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
         
          <DrawerHeader borderBottomWidth='1px'>
              <div className='bg-slate-50 p-3 rounded-2xl items-center flex'>
  <CiSearch type='button' onClick={handlesearch} />
<input type="text" placeholder='Search user' onKeyDown={handlesearch} onChange={(e)=>setSearchResult(e.target.value)} className='bg-slate-50 ps-3 outline-none' />

              </div>
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing='24px'>
            {IsLoading ? (
 <Stack spacing='24px'>
    <Skeleton height='20px' />
    <Skeleton height='20px' />
    <Skeleton height='20px' />
    <Skeleton height='20px' />
    <Skeleton height='20px' />
    <Skeleton height='20px' />
    <Skeleton height='20px' />
    <Skeleton height='20px' />
    <Skeleton height='20px' />
 </Stack>
) : searchResults && searchResults.length > 0 ?
searchResults.map((result, index) => (
                <Box key={index}   onClick={() => handleUserSelection(result._id)}  >
                 <div className="container text-center  p-1 flex  justify-between ">
    <div className="user-profile-left items-center flex">
    <Avatar isBordered radius="md" name={result.name[0]} />
    <div className=' flex flex-col ps-6 text-left'>

    <p className="font-bold ">{result.name}</p>
    <p className="text-xs">{result.email}</p>
    </div>
    </div>
   </div> {/* Assuming each result has a 'name' property */}
                </Box>
              )) : hasSearched ?( <p>no result found</p> ) : null}

             

             
          

          
            </Stack>
          </DrawerBody>

         
        </DrawerContent>
      </Drawer>

    </>
  )

}
export default SiderMenu