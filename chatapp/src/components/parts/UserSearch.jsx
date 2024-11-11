import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

function UserSearch({searchuser, handlefunction}) {
    const {user} = useContext(AuthContext)
  return (
    <>
        <p>{searchuser.name}</p>
        {/* <p>{user.gmail}</p> */}
    </>
  )
}

export default UserSearch