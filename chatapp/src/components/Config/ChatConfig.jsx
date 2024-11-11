// export  const getSender=   (loggedUser ,users) =>{
  
//         return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
  
//     };
export const getSender = (loggedUser, users) => {
   if (users && users.length >= 2) {
     const sender = users.find((user) => user._id!== loggedUser.id);
     return sender? sender.name : 'N/A';
   } else {
     return 'N/A';
   }
 };
    
// ChatConfig.jsx

export const getSenderFull = (loggedUser, users) => {
   if (users && users.length >= 2) {
     const sender = users.find((user) => user._id!== loggedUser.id);
     return sender? sender : 'N/A';
   } else {
     return 'N/A';
   }
 };


export const isSameSender = (messages, m, i, loggedUser) => {
  return (
    i < messages.length &&
    (messages[i + 1].sender._id === m.sender._id || messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id!== loggedUser
  );
};
 export const isLastmessages = (messages, i, loggedUser) =>{
return(
   i=== messages.length -1 &&
   messages[messages.length-1].sender._id !== loggedUser &&
   messages[messages.length-1].sender._id
)
 }
