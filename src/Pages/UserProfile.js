import { useContext,useEffect,useState } from "react"
import { AuthContext } from "../Context/AuthContext"
import { getUserIdByEmail,addUserSubId,getUserFromCognito,findEmail } from "../Collections/Users"
import axios from 'axios';
import { getSession,getCurrentUser } from "../auth"
import { apiEndPoints } from "../apiEndpoints";
export default function UserProfile(props) {

  const { user, signOut } = useContext(AuthContext);

  if(!user){
    return(<div>Log in <a href="login">here</a></div>)
  }

  return (
    <div>
      {user && (
        <div>
          <h2>User Profile</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  )
}