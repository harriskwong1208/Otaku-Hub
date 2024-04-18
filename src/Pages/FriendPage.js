import SearchFriend from "../components/searchFriend";
import ListFriends from "../components/listFriends";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import "../styles/FriendPage.css";
import Login from "./LogIn";
export default function FriendPage() {
  const [component, setComponent] = useState("friends");
  const { user } = useContext(AuthContext);

  if (user == null) {
    return <Login />;
  }

  return (
    <div id="FriendPage">
      <div className="Button-Container">
        <button id="friends-btn" onClick={() => setComponent("friends")}>
          Show List of Friends
        </button>
        <button id="users-btn" onClick={() => setComponent("search")}>
          Search for users{" "}
        </button>
      </div>
      <div className="List-Section">
        {(component == "search" || component == "") && <SearchFriend />}
        {component == "friends" && <ListFriends />}
      </div>
    </div>
  );
}
