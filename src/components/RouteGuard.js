// higher-order component called RouteGuard that will check if the user is logged in before rendering the protected component.
import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "./AuthContext"

function RouteGuard({ children }) {
  const { user, isLoading } = useContext(AuthContext)

  //If the user data hasn't been checked yet 
  //, isLoading will be true and we'll return an empty fragment to "do nothing" while we wait.
  if (isLoading) {
    return <></>
  }


    //If the user is not logged in, we'll redirect them to the login page.
    //Otherwise, the user is logged in and we'll render the child components.
  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}

export default RouteGuard
