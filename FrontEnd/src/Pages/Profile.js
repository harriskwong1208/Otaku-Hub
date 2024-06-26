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
  const [bio, setBio] = useState();
  const [image, setImage] = useState();
  async function loadingUserData() {
    try {
      const id = await getCurrentUserId();

      const response = await axios.get(apiEndPoints.backEndApi + "users/" + id);
      console.log(response);
      setData(response.data.user);
      setName(response.data.user.name);
      setBio(response.data.user.bio);
      setAnime(response.data.user.fav_anime);
      setManga(response.data.user.fav_manga);
      setCharacter(response.data.user.fav_character);
      setImage(response.data.user.imageUrl);
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

  //Change interface based on if edit or save mode
  // Save data to database if user saves changes
  async function editMode() {
    if (edit) {
      let url = image
        ? image
        : "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg";

      try {
        const id = await getCurrentUserId();
        const response = await axios.put(
          apiEndPoints.backEndApi + "users/" + id,
          {
            fav_anime: anime,
            name: name,
            fav_manga: manga,
            fav_character: character,
            bio: bio,
            imageUrl: url,
          }
        );
        console.log(response);
        setEdit(false);
      } catch (e) {
        console.log(e);
        alert("Something went wrong. Cannot save. Please try again later.");
      }
    } else {
      setEdit(true);
    }
  }
  return (
    <div className="Profile">
      <div id="card">
        <div id="pictureContainer">
          <img src={image} alt="ProfilePicture"></img>
          {edit == true && (
            <label for="ImgUrl">
              <input
                id="ImgUrl"
                placeholder="Enter Image Url here"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </label>
          )}
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              ) : (
                <span>{name || "Unknown"}</span>
              )}
            </div>
            <div id="anime">
              <label for="favorite-anime-input">Favorite Anime:</label>{" "}
              {edit ? (
                <input
                  className="input"
                  id="favorite-anime-input"
                  placeholder="Enter anime here"
                  value={anime}
                  onChange={(e) => setAnime(e.target.value)}
                ></input>
              ) : (
                <span>{anime || "Unknown"}</span>
              )}
            </div>
            <div id="manga">
              <label for="favorite-manga-input">Favorite Manga:</label>{" "}
              {edit ? (
                <input
                  className="input"
                  id="favorite-manga-input"
                  placeholder="Enter manga here"
                  value={manga}
                  onChange={(e) => setManga(e.target.value)}
                ></input>
              ) : (
                <span>{manga || "Unknown"}</span>
              )}
            </div>
            <div id="character">
              <label for="favorite-character-input">Favorite character:</label>{" "}
              {edit ? (
                <input
                  className="input"
                  id="favorite-character-input"
                  placeholder="Enter character here"
                  value={character}
                  onChange={(e) => setCharacter(e.target.value)}
                ></input>
              ) : (
                <span>{character || "Unknown"}</span>
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
          <textarea
            id="bio-input"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          >
            {user?.bio}
          </textarea>
        ) : (
          <div id="bio">{bio || "Can we get much higher ? "}</div>
        )}
      </div>
    </div>
  );
}
