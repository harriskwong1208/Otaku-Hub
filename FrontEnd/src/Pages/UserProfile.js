import { useEffect, useState } from "react";
import axios from "axios";
import { apiEndPoints } from "../apiEndpoints";
import { useParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
    let data = await axios.get(apiEndPoints.backEndApi + "users/" + id);
    const userinfo = data;
    setUser(data.data.user);
    console.log("userInfo:");
    console.log(userinfo);
    //Get friends' names
    const friends = await getFriends(data.data.user.friends);
    setFriends(friends);

    //Set anime and manga lists
    data = await setList(data.data.user.watchList, getAnime, "anime");
    console.log("WatchList:");
    console.log(data);
    setWatchList(data);

    data = await setList(userinfo.data.user.mangaList, getManga, "manga");
    console.log("MangaList:");
    console.log(data);
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
      <div id="Profile">
        <div id="ProfileCard">
          <div id="username">{user?.userName ? user.userName : "Unknown"}</div>
          <div id="imgContainer">
            <img
              id="pfp"
              src={user?.imageUrl && user.imageUrl}
              alt="User profile img"
            ></img>
          </div>
          <div id="info">
            <div className="information" id="name">
              <strong>Name:</strong>
              <span>{user?.name ? user?.name : "Unknown"}</span>
            </div>
            <div className="information" id="email">
              <strong>Email:</strong>
              <span>{user?.email ? user?.email : "Unknown"}</span>
            </div>
            <div className="information" id="favorite">
              <strong>Favorite</strong> ~
              <div className="item" id="anime">
                <strong>Anime:</strong>
                <span>{user?.anime ? user.anime : "Unknown"}</span>
              </div>
              <div className="item" id="manga">
                <strong>Manga:</strong>
                <span>{user?.manga ? user.manga : "Unknown"}</span>
              </div>
              <div className="item" id="character">
                <strong>character:</strong>
                <span>{user?.character ? user.character : "Unknown"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="Details">
        <div id="Bio">
          <h2 className="title">About Me:</h2>
          <p id="description">
            {user?.bio ? user.bio : "Can we get much higher? "}
          </p>
        </div>
        <div id="watchlist">
          <h2 className="listTitle">Watch List</h2>
          <hr></hr>
          <div id="animeList" className="list">
            {watchList && (
              <>
                {watchList?.map((anime, index) => (
                  <a
                    id="anime"
                    href={`/anime/${anime.mal_id}`}
                    target="_blank"
                    className="listItem"
                    key={anime.mal_id}
                  >
                    <div className="imgContainer">
                      <img
                        className="itemImg"
                        id="animeImg"
                        src={
                          anime?.imageUrlLarge ||
                          anime?.imageUrl ||
                          anime?.imageUrlSmall
                        }
                      />
                    </div>
                    <div id="animeName" className="itemName">
                      {anime?.name ? anime.name : "Unknown"}
                    </div>
                  </a>
                ))}
              </>
            )}
          </div>
          <h2 className="listTitle">Manga List</h2>
          <hr></hr>
          <div id="mangaList" className="list">
            {mangaList && (
              <>
                {mangaList?.map((manga, index) => (
                  <a
                    id="manga"
                    href={`/manga/${manga.mal_id}`}
                    target="_blank"
                    className="listItem"
                    key={manga.mal_id}
                  >
                    <div className="imgContainer">
                      <img
                        className="itemImg"
                        id="mangaImg"
                        src={
                          manga?.imageUrlLarge ||
                          manga?.imageUrl ||
                          manga?.imageUrlSmall
                        }
                      />
                    </div>
                    <div id="mangaName" className="itemName">
                      {manga?.title && manga.title}
                    </div>
                  </a>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
