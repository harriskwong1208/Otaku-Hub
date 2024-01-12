import { useEffect, useState } from "react"
import { getCurrentUser,signOut } from "../auth"


export default function UserProfile() {
  const [user, setUser] = useState()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser()
        setUser(user)
      } catch (err) {
        console.error(err)
      }
    }

    fetchUser()
  }, [])

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