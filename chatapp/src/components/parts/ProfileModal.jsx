import {
  Avatar,
  Button,
  Chip,
  Code,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  User,
  useDisclosure,
} from "@nextui-org/react";
import React, { useContext, useState } from "react";
import { chatContext } from "../../context/chatContex";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { IoPersonRemove } from "react-icons/io5";
import { CottageSharp } from "@mui/icons-material";
// import { fetchChat } from "../../../../server/controller/ChatController";

function ProfileModal({ user, isGroupChat, children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
const {selectedUsers, setSelectedUsers ,setChats} =  useContext(chatContext)
const [RenameGroup , setRenameGroup] = useState("")
const [pickuser, setpickuser] = useState();
const [AddUser , setAddUser] = useState()
const [IsLoading , setIsLoading] = useState(false)
const {token , user:loggedInUser}=useContext(AuthContext)
const [searchResults, setSearchResults] = useState([]);
console.log(pickuser)
// const {user} =useContext(AuthContext)
console.log("Logged-in User ID:", loggedInUser.id);



console.log("group admin is",selectedUsers.isGroupAdmin)

const handleUserSelection = async (user1) => {
  
  if(selectedUsers.users.find((u)=> u._id === user1._id)){
    toast.error("user already exist");
    return;
  }

  if(selectedUsers.isGroupAdmin !== loggedInUser.id){
    toast.error("Only Admin Can Add User")
    return;
  }
  try {
    // const {response} = await axios.put(`http://localhost:3000/api/chat/groupadd`, {
    const {response} = await axios.put(`${import.meta.env.VITE_REACT_APP_API}/api/chat/groupadd`, {
      chatId: selectedUsers._id, // Assuming selectedUsers has an _id property
      userId: user1._id, // Assuming AddUser is the user's ID you want to add
      // userId: pickuser.map((u)=> u._id), // Assuming AddUser is the user's ID you want to add
    });
    setSelectedUsers(response)
    toast.success("User added successfully")
    console.log(response);
    // fetchChats();
    // Handle success (e.g., show a success message, update the UI)
  } catch (error) {
    console.error(error);
    // Handle error (e.g., show an error message)
  }
};

const handleall=() =>{

  handleRenameGroup()
  handleUserSelection()
  
}
const handleClose =async(user1)=>{
  
  if (selectedUsers.isGroupAdmin !== loggedInUser.id  )
    {
      toast.error("only Group Admin Can Remove ")
      return;
    }
    if (selectedUsers.users.find(user => user._id === user1._id && user.isAdmin)) {
      toast.error("Cannot remove the group admin");
      return;
   }
    try {
      const config ={
         headers: {
                Authorization: `Bearer ${token}` // Assuming you have the token available
            }
      }
      // const {response} = await axios.put(`http://localhost:3000/api/chat/groupremove`, {
      const {response} = await axios.put(`${import.meta.env.VITE_REACT_APP_API}/api/chat/groupremove`, {
        chatId: selectedUsers._id, // Assuming selectedUsers has an _id property
        userId: user1._id, // Assuming AddUser is the user's ID you want to add
      });
      setSelectedUsers(response)
      toast.success("User removed successfully")
      // fetchChats()
      } catch (error) {
      console.log(error)
    }
}
const handleSearch = async () => {
   
  try {
    const {data} = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/auth/alluser?search=${AddUser}`, {
    // const {data} = await axios.get(`http://localhost:3000/api/auth/alluser?search=${AddUser}`, {
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

const handleRenameGroup = async () => {

  try {
    const newName = RenameGroup || selectedUsers.chatName; 
    const config={
       headers: {
              Authorization: `Bearer ${token}` // Assuming you have the token available
          }
    }
    // const response = await axios.put(`http://localhost:3000/api/chat/rename`, {
    const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API}/api/chat/rename`, {
      chatId: selectedUsers._id, // Assuming selectedUsers has an _id property
      chatName: RenameGroup,
    }, config);
    setSelectedUsers(response)
    console.log(response);
    toast.success("Group Renamed Successfully")
    // Handle success (e.g., show a success message, update the UI)
  } catch (error) {
    console.error(error);
    // Handle error (e.g., show an error message)
  }
};
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <span onClick={onOpen}>EYES</span>
      )}
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {" "}
                {isGroupChat ? <>Group Chat</> : <>{user.name}</>}
              </ModalHeader>
              <ModalBody className="item-center">
                <Avatar className="w-20 h-20 text-large self-center" />
              </ModalBody>
              {!isGroupChat && (
                <div className="p-9 flex-col flex">
                  <Code color="default">name: {user ? user.name : "N/A"}</Code>
                  <Code color="default">
                    Email: {user ? user.email : "N/A"}
                  </Code>
                  {/* <Input label="Change Group Name" />
                                    <Input label="Add User" /> */}
                </div>
              )}

              {isGroupChat && (
                <>
                  <div className="  gap-2">
                { selectedUsers.users.map((user, index ) =>
                  <Chip className={`m-2 ${user._id === selectedUsers.isGroupAdmin ?  'admin-chip': ''}`}   key={index}   onClose={() => handleClose(user)} >name: {user.name } </Chip>


                  
         
                )}
                </div>
                <div className="flex flex-row">

              <Input label="Rename Groups" onChange={(e)=>setRenameGroup(e.target.value)}   />
              <Button color="danger" variant="light" onClick={    handleRenameGroup} >
                  Rename
                  </Button>
                </div>
                <div className="flex flex-row">


              <Input label="Add USer in Groups" value={AddUser} onChange={(e)=>setAddUser(e.target.value)}  />
              <Button color="danger" variant="light" onClick={handleSearch} >
                  Add
                  </Button>
                </div>
                {/* {pickuser.map((user,  index) =>(

                  <Chip color="default"  variant="flat"  onClose={() => handleClose(user)}  >{user.name}  </Chip>
                )

              )
                } */}
              { searchResults &&  searchResults.map((user, index) => (
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
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary"onPress={onClose}  onClick={handleall}>
                    Update
                  </Button>
                </ModalFooter>
              </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfileModal;
