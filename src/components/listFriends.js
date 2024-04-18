import { getFriendsFromUser } from "../Collections/Users";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { apiEndPoints } from "../apiEndpoints";
import LoadComponent from "./Loading";
import { useNavigate } from "react-router-dom";
import "../styles/FriendPage.css";
export default function ListFriends() {
  const [friends, setFriends] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [listItems, setListItems] = useState([]);
  const [friendCount, setFriendCount] = useState(0);
  const navigate = useNavigate();
  async function loadList() {
    const _friends = [];
    try {
      const friends = await getFriendsFromUser();
      setFriends(friends);
      for (let i of friends) {
        const response = await axios.get(apiEndPoints.localHost + "users/" + i);
        const data = response.data.user;
        _friends.push(data);
      }
      setFriendCount(_friends.length);
      return _friends;
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setIsLoading(true);

    loadList()
      .then((data) => {
        setListItems(data);
        setIsLoading(false);
      })
      .catch((e) => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <LoadComponent />;
  }

  return (
    <div id="ListFriendComponent">
      <div className="header">
        <div id="title">Friends</div>
        <div id="friends-count">{friendCount}</div>
      </div>
      <div id="friends-list">
        {listItems &&
          listItems.map((item) => (
            <div
              key={item._id}
              className="friend"
              onClick={() => navigate(`/user/${item._id}`)}
            >
              <div className="top-section">
                <div className="Img">
                  <img src={item.imageUrl}></img>
                </div>
                <div className="name">{item.name}</div>
              </div>
              <div className="bottom-section"></div>
            </div>
          ))}
      </div>
    </div>
  );
}
