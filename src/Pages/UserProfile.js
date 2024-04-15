import { useEffect, useState } from "react";
import axios from "axios";
import { apiEndPoints } from "../apiEndpoints";
import { useParams } from "react-router-dom";
import { getAnime } from "../Collections/Anime";
import { getManga } from "../Collections/Manga";
import LoadComponent from "../components/Loading";
import { getFriends } from "../Collections/Users";
import "../styles/UserProfile.css";
export default function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [watchList, setWatchList] = useState();
  const [mangaList, setMangaList] = useState();
  const [friends, setFriends] = useState();

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
    <div id="UserProfile">
      {/* Name: {user && <div>{user.name}</div>}
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
      )} */}
      <div id="Profile">
        <div id="ProfileCard">
          <div id="username">Username</div>
          <div id="imgContainer">Img</div>
          <div id="info">
            <div className="information" id="name">
              Name
            </div>
            <div className="information" id="email">
              Email
            </div>
            <div className="information" id="favorite">
              Favorite:
              <div className="item" id="anime">
                Anime
              </div>
              <div className="item" id="manga">
                Manga
              </div>
              <div className="item" id="character">
                character
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="Details">
        <div id="Bio">
          <h2 className="title">About Me:</h2>
          <p id="description">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <div id="watchlist">
          <h2>Watch List</h2>
          <div id="animeList">
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
          </div>
          <h2>Manga List</h2>
          <div id="mangalist"></div>
        </div>
      </div>
    </div>
  );
}
