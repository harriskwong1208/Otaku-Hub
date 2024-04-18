import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import {
  getUserIdByEmail,
  addUserSubId,
  getUserFromCognito,
  findEmail,
  getCurrentUserId,
} from "../Collections/Users";
import axios from "axios";
import { getSession, getCurrentUser } from "../auth";
import { apiEndPoints } from "../apiEndpoints";
import "../styles/Profile.css";
import LoadComponent from "../components/Loading";
import Login from "./LogIn";
export default function Profile() {
  const { user, signOut } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  async function loadingUserData() {
    try {
      const id = await getCurrentUserId();
      const response = await axios.get(apiEndPoints.backEndApi + "users/" + id);
      setData(response.data.user);
      return response;
    } catch (e) {
      return new Error(e);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    loadingUserData()
      .then((data) => {
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadComponent />;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="Profile">
      <div id="card">
        <div id="pictureContainer">
          <img src={data && data.imageUrl}></img>
        </div>
        <div id="infoContainer">
          <div id="usernameContainer">
            <div id="username">{user ? user.username : "User"}</div>
          </div>
          <div id="info">
            <div id="email">
              email: <span>{user && user.email}</span>
            </div>
            <div id="name">
              Name: <span>...</span>
            </div>
            <div id="anime">
              Favorite Anime: <span>...</span>
            </div>
            <div id="manga">
              Favorite Manga: <span>...</span>
            </div>
            <div id="character">
              Favorite Character: <span>...</span>
            </div>
          </div>
        </div>
      </div>
      <div id="Description">
        <div id="title">About me:</div>
        <div id="bio">Lorem Ipsum</div>
      </div>
    </div>
  );
}
