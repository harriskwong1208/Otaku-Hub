import { getFriendsFromUser } from "../Collections/Users";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { apiEndPoints } from "../apiEndpoints";
import LoadComponent from "./Loading";
export default function ListFriends() {
  const [friends, setFriends] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [listItems, setListItems] = useState([]);

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
    <div>
      <ul>
        {/* item includes: email, friends [], mangalist[], name, watchList[], _id */}
        {listItems &&
          listItems.map((item) => (
            <li key={item._id}>
              <a target="_blank" href={`user/${item._id}`}>
                {item.name}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}
