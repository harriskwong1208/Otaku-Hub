import { useState } from "react"
import { signUp } from "../auth"
import { Link } from "react-router-dom";
import axios from 'axios';

export default function SignUp() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(""); 
    try {
      await signUp(username, email, password)              
      /*****************************************************************/
      //TEMP API ENDPOINT FOR DEVELOPEMENT
      await axios.post('http://localhost:5000/users/',{
        name: username,
        email: email,
      }); 
      setSuccess(true)
      console.log('Successfully added user in database and auth.');
    } catch (err) {
      setError(err.message)
    }
  }

  if (success) {
    return (
      <div>
        <h2>SignUp successful!</h2>
        <p>Please check your email for the confirmation code.</p>
        <Link to='/confirm-sign-up'>Click here to confirm account</Link>
      </div>
    )
  }

  return (
    <div>
      <h2>SignUp</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">SignUp</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}