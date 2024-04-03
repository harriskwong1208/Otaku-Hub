import { useState } from "react";
import { signUp } from "../auth";
import { Link } from "react-router-dom";
import axios from "axios";
import { findEmail } from "../Collections/Users";
export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const _findEmail = await findEmail(email);
      if (_findEmail === 1) {
        throw new Error("Email already in use!!");
      }
      await signUp(username, email, password);
      /*****************************************************************/
      //TEMP API ENDPOINT FOR DEVELOPEMENT
      await axios.post("https://otakuhubexpress.ue.r.appspot.com/api/users/", {
        name: username,
        email: email,
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
      });
      setSuccess(true);
      console.log("Successfully added user in database and auth.");
    } catch (err) {
      setError(err.message);
    }
  };

  if (success) {
    return (
      <div>
        <h2>SignUp successful!</h2>
        <p>Please check your email for the confirmation code.</p>
        <Link to="/confirm-sign-up">Click here to confirm account</Link>
      </div>
    );
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
  );
}
