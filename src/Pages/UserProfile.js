import { useEffect, useState } from "react";
import axios from "axios";
import { apiEndPoints } from "../apiEndpoints";
import { useParams } from "react-router-dom";
import { getAnime } from "../Collections/Anime";
import { getManga } from "../Collections/Manga";
import LoadComponent from "../components/Loading";
export default function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [watchList, setWatchList] = useState();
  const [mangaList, setMangaList] = useState();
  const [friends, setFriends] = useState();

  async function getFriends(friends) {
    let _friends = [];
    for (let i of friends) {
      let data = await axios.get(apiEndPoints.localHost + "users/" + i);
      _friends.push(data.data.user.name);
    }
    return _friends;
  }

  async function setList(List, callback, type) {
    let list = [];
    for (let i of List) {
      const response = await callback(i);
      const data = response.data[type];
      list.push(data);
    }
    return list;
  }

  async function setAllLists() {
    let data = await axios.get(apiEndPoints.localHost + "users/" + id);
    const userinfo = data;
    setUser(data.data.user);

    //Get friends' names
    const friends = await getFriends(data.data.user.friends);
    setFriends(friends);

    //Set anime and manga lists
    data = await setList(data.data.user.watchList, getAnime, "anime");
    // console.log('WatchList:');
    // console.log(data);
    setWatchList(data);

    data = await setList(userinfo.data.user.mangaList, getManga, "manga");
    // console.log('MangaList:');
    // console.log(data);
    setMangaList(data);
  }

  useEffect(() => {
    setIsLoading(true);
    // getUserName(id)
    //     .then(data=>{

    //     })
    //     .catch(e=>console.error(e));
    setAllLists()
      .then(() => {
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadComponent />;
  }

  return (
    <div>
      Name: {user && <div>{user.name}</div>}
      Friends:{" "}
      {friends && (
        <ul>
          {friends.map((friend, index) => (
            <li key={index}>{friend}</li>
          ))}
        </ul>
      )}
      Watch List:{" "}
      {watchList && (
        <ul>
          {watchList.map((anime, index) => (
            <li key={index}>
              <a href={`/anime/${anime.mal_id}`} target="_blank">
                {anime.name}
              </a>
            </li>
          ))}
        </ul>
      )}
      Manga List:
      {mangaList && (
        <ul>
          {mangaList.map((manga, index) => (
            <li key={index}>
              <a href={`/manga/${manga.mal_id}`} target="_blank">
                {manga.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
