import { useState } from "react";
import { signUp } from "../auth";
import { Link } from "react-router-dom";
import axios from "axios";
import { findEmail } from "../Collections/Users";
import "../styles/SignUp.css";
import { apiEndPoints } from "../apiEndpoints";
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
      await axios.post(apiEndPoints.backEndApi + "users/", {
        userName: username,
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
    <div id="SignUpPage">
      <form onSubmit={handleSubmit}>
        <div className="SignUpContainer">
          <div className="title">
            <h1>Sign Up</h1>
          </div>
          <div className="Message">
            Please enter your Username, Email, and Password
          </div>
          <div className="inputFields">
            <div className="inputContainer">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id="Username"
              ></input>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="PasswordInput"
              ></input>
            </div>
          </div>
          <div className="btnContainer">
            <button type="submit" className="SignUpBtn">
              Sign Up
            </button>
          </div>
        </div>
      </form>
      {error && <p className="error">Error: {error}</p>}
    </div>
  );
}
