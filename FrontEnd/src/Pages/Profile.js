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
  const [name, setName] = useState();
  const [anime, setAnime] = useState();
  const [manga, setManga] = useState();
  const [character, setCharacter] = useState();

  async function loadingUserData() {
    try {
      const id = await getCurrentUserId();
      const response = await axios.get(apiEndPoints.backEndApi + "users/" + id);
      setData(response.data.user);
      setName(response.data.user.name);
      if (response.data.user.favorite) {
        if (response.data.user.favorite[0]) {
          setAnime(response.data.user.favorite[0]);
        }
        if (response.data.user.favorite[1]) {
          setManga(response.data.user.favorite[1]);
        }
        if (response.data.user.favorite[2]) {
          setCharacter(response.data.user.favorite[2]);
        }
      }
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
              <label for="favorite-anime-input">Favorite Anime:</label>{" "}
              {edit ? (
                <input
                  className="input"
                  id="favorite-anime-input"
                  placeholder="Enter anime here"
                ></input>
              ) : (
                <span>
                  {data?.favorite ? data.favorite[0] || "Unknown" : "Unknown"}
                </span>
              )}
            </div>
            <div id="manga">
              <label for="favorite-manga-input">Favorite Manga:</label>{" "}
              {edit ? (
                <input
                  className="input"
                  id="favorite-manga-input"
                  placeholder="Enter manga here"
                ></input>
              ) : (
                <span>
                  {data?.favorite ? data.favorite[1] || "Unknown" : "Unknown"}
                </span>
              )}
            </div>
            <div id="character">
              <label for="favorite-character-input">Favorite character:</label>{" "}
              {edit ? (
                <input
                  className="input"
                  id="favorite-character-input"
                  placeholder="Enter character here"
                ></input>
              ) : (
                <span>
                  {data?.favorite ? data.favorite[2] || "Unknown" : "Unknown"}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div id="Description">
        <div id="title">
          <label for="bio-input">About me:</label>
        </div>
        {edit ? (
          <textarea id="bio-input">{user?.bio}</textarea>
        ) : (
          <div id="bio">Lorem Ipsum</div>
        )}
      </div>
    </div>
  );
}
