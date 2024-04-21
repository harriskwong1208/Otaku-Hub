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
  const [edit, setEdit] = useState(false);
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
        console.log(data);
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

  function editMode() {
    if (edit) {
      setEdit(false);
    } else {
      setEdit(true);
    }
  }
  return (
    <div className="Profile">
      <div id="card">
        <div id="pictureContainer">
          <img src={data?.imageUrl} alt="ProfilePicture"></img>
        </div>
        <div id="infoContainer">
          <div id="usernameContainer">
            <div id="username">{data?.userName || "User"}</div>
            <div id="editBtnContainer">
              <button id="editBtn" onClick={editMode}>
                {edit == true ? "Save" : "Edit"}
              </button>
            </div>
          </div>
          <div id="info">
            <div id="email">
              email: <span>{user?.email || "Unknown"}</span>
            </div>
            <div id="name">
              <label for="user-name">Name:</label>
              {edit ? (
                <input
                  className="input"
                  id="user-name-input"
                  placeholder="Enter name here"
                ></input>
              ) : (
                <span>{data?.name || "Unknown"}</span>
              )}
            </div>
            <div id="anime">
              Favorite Anime:{" "}
              <span>
                {data?.favorite ? data.favorite[0] || "Unknown" : "Unknown"}
              </span>
            </div>
            <div id="manga">
              Favorite Manga:{" "}
              <span>
                {" "}
                {data?.favorite ? data.favorite[1] || "Unknown" : "Unknown"}
              </span>
            </div>
            <div id="character">
              Favorite Character:{" "}
              <span>
                {data?.favorite ? data.favorite[2] || "Unknown" : "Unknown"}
              </span>
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
