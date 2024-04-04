import { useEffect, useState, useContext } from "react";
import {
  getAllUsersFromDatabase,
  addFriendToUser,
  getCurrentUserId,
  getCurrentUserDatabase,
} from "../Collections/Users";
import { AuthContext } from "../Context/AuthContext";
import LoadComponent from "./Loading";
import "../styles/FriendPage.css";
import icon from "../static/searchIcon.png";
import { useNavigate } from "react-router";
export default function SearchFriend() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState();
  const [searchItem, setSearchItem] = useState("");
  const [userId, setUserId] = useState();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate("");
  async function getAllUsers() {
    setIsLoading(true);
    return await getAllUsersFromDatabase();
  }

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filteredItems);
  };

  async function getCurrUser() {
    const id = await getCurrentUserId();
    setUserId(id);
    console.log(`userId: ${userId}`);
  }

  useEffect(() => {
    getAllUsers()
      .then((data) => {
        console.log(data);
        setUsers(data);
        setFilteredUsers(data);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  }, []);

  useEffect(() => {
    try {
      getCurrUser();
    } catch (e) {
      console.log(e);
    }
  }, [user]);

  if (isLoading) {
    return <LoadComponent />;
  }

  return (
    <div className="SearchFriendsComponent">
      <div className="searchbar">
        <input onChange={handleInputChange} placeholder="Search Friend"></input>
      </div>
      <div className="friends">
        {filteredUsers &&
          filteredUsers.map((user) => (
            <>
              {userId != user._id && (
                <div className="friend" key={user._id}>
                  <div className="itemContainer">
                    <div className="picture">
                      <div className="img-container">
                        <img src={user.imageUrl && user.imageUrl}></img>
                      </div>
                    </div>
                    <div className="nameAndButton">
                      <div className="name">
                        <a href={`/user/${user._id}`} target="_blank">
                          {user.name ? user.name : "UnKnown"}
                        </a>
                      </div>
                      <div id="addFriendBtn" className="button-container">
                        <button onClick={() => addFriendToUser(user._id)}>
                          Add friend
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ))}
      </div>
    </div>
  );
}
