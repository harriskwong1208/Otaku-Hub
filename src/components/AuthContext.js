import { createContext, useState, useEffect } from "react"
import * as auth from "../auth"

const AuthContext = createContext()


//AuthProvider wrap our entire app
// This component maintains the user state
function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const getCurrentUser = async () => {
    try {
      const user = await auth.getCurrentUser()
      setUser(user)
    } catch (err) {
      // not logged in
      console.log(err)
      setUser(null)
    }
  }

  useEffect(() => {
    getCurrentUser()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false))
  }, [])

  //Calls cognito signin function and updates the user state
  //Should be called by the login form intead of the cognito signin function
  const signIn = async (username, password) => {
    debugger
    await auth.signIn(username, password)
    await getCurrentUser()
  }
    //calls the cognito signOut function and updates the user state. 
    //This should be called any component that logs the user out instead of the cognito signOut function.  
  const signOut = async () => {
    await auth.signOut()
    setUser(null)
  }

  const authValue = {
    user,
    isLoading,
    signIn,
    signOut,
  }

  return (
    <AuthContext.Provider value={authValue}>
        {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }