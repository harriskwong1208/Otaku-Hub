import { useState } from "react";
import { confirmPassword } from "../auth";
import { Link } from "react-router-dom";
import "../styles/ResetPassword.css";
export default function ResetPassword() {
  const [username, setUsername] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (newPassword == "" || username == "" || confirmationCode == "") {
      setError("Missing Fields");
      return;
    }
    try {
      await confirmPassword(username, confirmationCode, newPassword);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  if (success) {
    return (
      <div>
        <h2>Reset password</h2>
        <p>Your password has been reset successfully!</p>
        <Link to="/reset-password">Reset Password</Link>
      </div>
    );
  }

  return (
    // <div>
    //   <h2>Reset Password</h2>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="text"
    //       placeholder="Username"
    //       value={username}
    //       onChange={(e) => setUsername(e.target.value)}
    //     />
    //     <input
    //       type="text"
    //       placeholder="Confirmation code"
    //       value={confirmationCode}
    //       onChange={(e) => setConfirmationCode(e.target.value)}
    //     />
    //     <input
    //       type="password"
    //       placeholder="New password"
    //       value={newPassword}
    //       onChange={(e) => setNewPassword(e.target.value)}
    //     />
    //     <button type="submit">Submit</button>
    //   </form>
    //   {error && <p>{error}</p>}
    // </div>
    <div id="ResetPasswordPage">
      <form onSubmit={handleSubmit}>
        <div className="ResetPasswordContainer">
          <div className="title">
            <h1>Reset Password</h1>
          </div>
          <div className="Message">
            Please enter your username, confirmation code, and new password
          </div>
          <div className="inputFields">
            <div className="inputContainer">
              <input
                required
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id="Username"
              ></input>
              <input
                required
                type="text"
                placeholder="Confirmation code"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
              ></input>
              <input
                required
                type="password"
                placeholder="Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                id="PasswordInput"
              ></input>
            </div>
          </div>
          <div className="btnContainer">
            <button type="submit" className="ResetBtn">
              Reset
            </button>
          </div>
        </div>
      </form>
      {error && <p className="error">Error: {error}</p>}
    </div>
  );
}
