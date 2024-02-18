import { useState,useContext } from "react"
import { confirmSignUp } from "../auth"
import { AuthContext } from "../Context/AuthContext"
import {getUserIdByEmail,addUserSubId,getUserFromCognito} from "../Collections/Users"
import { Link } from "react-router-dom"
export default function ConfirmSignUp() {
  const [username, setUsername] = useState("")
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const {signIn}= useContext(AuthContext);
  const [password,setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const user = await getUserIdByEmail(email);
      await confirmSignUp(username, code);
      await signIn(username,password);      
      const currUser = await getUserFromCognito();
      await addUserSubId(currUser.sub,user._id);
      setSuccess(true)
    } catch (err) {
      setError(err.message)
    }
  }

  if (success) {
    return (
      <div>
        <h2>Confirmation successful!</h2>
        <p>You can now log in with your credentials.</p>
        <Link to='/'>Click here to go home</Link>
      </div>
    )
  }

  return (
    <div>
      <h2>Confirm Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />   
        <input
          required
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />                
        <input
          required
          type="text"
          placeholder="Confirmation code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit">Confirm</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}