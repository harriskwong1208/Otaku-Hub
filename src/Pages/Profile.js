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
      const response = await axios.get(apiEndPoints.localHost + "users/" + id);
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
    return (
        <Login/>
    );
  }

  return (
    <div className="Profile">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <div className="card">
        <div className="image">
          <img src={data && data.imageUrl} alt="Profile-Picture"></img>
        </div>
        <div className="section" id="Username">
          <span>{user ? user.username : "User"}</span>
        </div>
        <div id="Email" className="section">
          <span>{user ? user.email : "User@gmail.com"}</span>
        </div>
        <div id="Bio" className="section">
          <span>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </span>
        </div>
        <div className="section" id="btn">
          <button className="Edit-Btn">Edit</button>
        </div>
      </div>
    </div>
  );
}
