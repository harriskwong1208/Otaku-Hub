import { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import "../styles/Login.css";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user, signIn } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signIn(username, password);
    } catch (err) {
      setError(err.message);
    }
  };

  // If the user is logged in, don't show the login form
  if (user) {
    // Redirect to the profile page
    return <Navigate to="/profile" />;
  }

  return (
    <div id="LoginPage">
      <form onSubmit={handleSubmit}>
        <div className="LoginContainer">
          <div className="title">
            <h1>LOGIN</h1>
          </div>
          <div className="Message">Please enter your login and password</div>
          <div className="inputFields">
            <div className="inputContainer">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                id="Username"
              ></input>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
              ></input>
            </div>
          </div>
          <div className="ForgotPassword">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
          <div className="btnContainer">
            <button type="submit" className="LogInBtn">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
