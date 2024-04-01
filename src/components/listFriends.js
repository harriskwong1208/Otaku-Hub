import { getFriendsFromUser } from "../Collections/Users";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { apiEndPoints } from "../apiEndpoints";
import LoadComponent from "./Loading";
import "../styles/FriendPage.css";
export default function ListFriends() {
  const [friends, setFriends] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [listItems, setListItems] = useState([]);
  const [friendCount, setFriendCount] = useState(0);
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

  const temp = [
    { _id: "123", name: "harris2" },
    { _id: "123", name: "harris3" },
    { _id: "123", name: "harris4" },
    { _id: "123", name: "harris4" },
    { _id: "123", name: "harris4" },
    { _id: "123", name: "harris4" },
    { _id: "123", name: "harris4" },
    { _id: "123", name: "harris4" },
    { _id: "123", name: "harris4" },
  ];
  return (
    <div id="ListFriendComponent">
      <div className="header">
        <div id="title">Friends</div>
        <div id="friends-count">{friendCount}</div>
      </div>
      <div id="friends-list">
        {/* item includes: email, friends [], mangalist[], name, watchList[], _id */}
        {/* {listItems &&
          listItems.map((item) => (
            <div key={item._id} className="friend">
              <div className="Img">Img</div>
              <div className="name">{item.name}</div>
            </div>
          ))} */}
        {temp &&
          temp.map((item) => (
            <div key={item._id} className="friend">
              <div className="top-section">
                <div className="Img">Img</div>
                <div className="name">{item.name}</div>
              </div>

              <div className="bottom-section"></div>
            </div>
          ))}
      </div>
    </div>
  );
}
