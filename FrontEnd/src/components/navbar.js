import "../styles/navbar.css";
import logo from "../static/sitelogo.jpg";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext.js";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const { user, signOut } = useContext(AuthContext);
  // const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="navbar">
      <div className="logo-sitename">
        <img className="logo" alt="Logo" src={logo} />
        <div className="sitename">
          <a href="/">OtakuHub</a>
        </div>
      </div>
      <div className="tabs">
        <div className="home">
          <a href="/">Home</a>
        </div>
        <div className="anime-tab">
          <a href="/animesearch">Anime</a>
        </div>
        <div className="manga">
          <a href="/mangasearch">Manga</a>
        </div>
        <div className="friends">
          <a href="/friends">Friends</a>
        </div>
        <div className="list">
          <a href="/list">List</a>
        </div>
        <div className="profile">
          <a href="/profile">Profile</a>
        </div>
      </div>
      <div className="login-out">
        {!user && (
          <div className="login">
            <a href="/login">Login</a>
          </div>
        )}
        {user && (
          <div className="logout" onClick={() => handleLogout()}>
            Log out
          </div>
        )}
        {!user && (
          <div className="signup">
            <a href="/signup">Sign Up</a>
          </div>
        )}
      </div>
    </div>
  );
}
