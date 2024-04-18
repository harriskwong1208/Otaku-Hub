import { useState } from "react";
import { forgotPassword } from "../auth";
import { Link } from "react-router-dom";
import "../styles/ForgotPassword.css";
export default function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await forgotPassword(username);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  if (success) {
    return (
      <div className="SuccessPage">
        <h1>Reset password</h1>
        <p className="MessageContainer">
          Check your email for the confirmation code to reset your password.
        </p>
        <p className="resetContainer">
          <a id="resetLink" href="/reset-password">
            Click here to reset password !
          </a>
        </p>
      </div>
    );
  }

  return (
    <div id="ForgotPasswordPage">
      <form onSubmit={handleSubmit}>
        <div className="ForgotPasswordContainer">
          <div className="title">
            <h1>Forgot Password ?</h1>
          </div>
          <div className="Message">Please enter your username</div>
          <div className="inputFields">
            <div className="inputContainer">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id="Username"
              ></input>
            </div>
          </div>
          <div className="btnContainer">
            <button type="submit" className="ForgotPasswordBtn">
              Submit
            </button>
          </div>
        </div>
      </form>
      {error && <p className="error">Error: {error}</p>}
    </div>
  );
}
