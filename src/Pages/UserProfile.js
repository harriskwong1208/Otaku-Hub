import { useContext,useEffect,useState } from "react"
import { AuthContext } from "../components/AuthContext"
import { getCurrentUser } from "../auth"
import { getUserIdByEmail,addUserSubId,getUserFromCognito } from "../Collections/Users"

export default function UserProfile() {
  const { user, signOut } = useContext(AuthContext)
  useEffect(()=>{
    async function getUserCognito(){
      // const user =  await getCurrentUser();
      // console.log(user.sub);
      // const user = await getUserIdByEmail('bleach123@gmail.com');
      // console.log(user._id);
      // try{
      //   const userData = await getUserIdByEmail('ichigobleach20002022@gmail.com');
      //   const userCog = await getUserFromCognito();
      //   await addUserSubId(userCog.sub,userData._id)
      // }catch(e){
      //   console.log(e);
      // }
    }
    getUserCognito();
    
  },[])


  return (
    <div>
      {user && (
        <div>
          <h2>User Profile</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          {/* Display any other user data here */}
        </div>
      )}
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}