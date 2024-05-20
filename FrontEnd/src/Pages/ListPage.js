import axios from "axios";
import { getUserWatchList, getUserMangaList } from "../Collections/Users";
import { getAnime } from "../Collections/Anime";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { getManga } from "../Collections/Manga";
import LoadComponent from "../components/Loading";
import Login from "./LogIn";
import "../styles/ListPage.css";
import Error from "../components/Error";
export default function ListPage() {
  //After setting anime, to get anime, use anime[index].data.anime
  const [anime, setAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const [manga, setManga] = useState([]);

  async function setMangaList(mangaIdList) {
    const mangaInfoList = [];
    for (let i of mangaIdList) {
      let _manga = [];
      let mangaDetails = await getManga(i[0]);
      _manga.push(mangaDetails.data.manga);
      _manga.push(i[1]);
      _manga.push(i[2]);
      mangaInfoList.push(_manga);
    }
    console.log(mangaInfoList);
    return mangaInfoList;
  }

  //returns array [ [[anime_details],rating,status],... ]
  async function setAnimeList(animeIdList) {
    const animeInfoList = [];
    for (let i of animeIdList) {
      let _anime = [];
      let animeDetails = await getAnime(i[0]);
      _anime.push(animeDetails.data.anime);
      _anime.push(i[1]);
      _anime.push(i[2]);
      animeInfoList.push(_anime);
    }

    return animeInfoList;
  }

  async function getList() {
    setIsLoading(true);
    try {
      const animeIdList = await getUserWatchList();
      const animeInfoList = await setAnimeList(animeIdList);
      const mangaList = await getUserMangaList();
      const mangaInfoList = await setMangaList(mangaList);
      setManga(mangaInfoList);
      setAnime(animeInfoList);

      return mangaInfoList;
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getList()
      .then((data) => {
        setIsLoading(false);
        // console.log(data);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  }, []);

  if (!user) {
    return <Login />;
  }

  if (isLoading) {
    return <LoadComponent />;
  }

  return (
    <div className="ListPage">
      <div className="List" id="AnimeList">
        <div className="typeTitle">Watching</div>
        <div className="itemContainer">
          <div className="header">
            <div className="title">Title</div>
            <div className="rating">Rating</div>
            <div className="header-status">Status</div>
          </div>
          {anime &&
            anime?.map((data, index) => (
              <div key={index} className="item">
                <div className="ImgAndTitle">
                  <div className="Img">
                    <img
                      src={
                        data[0]?.imageUrlLarge ||
                        data[0]?.imageUrl ||
                        data[0]?.imageUrlSmall
                      }
                    ></img>
                  </div>
                  <div className="title">
                    <a target="_blank" href={`/anime/${data[0]?.mal_id}`}>
                      {data[0]?.name}
                    </a>
                  </div>
                </div>
                <div className="rating">{data[1] && data[1]}</div>
                <div className="status">{data[2] && data[2]}</div>
              </div>
            ))}
        </div>
      </div>
      <div className="List" id="MangaList">
        <div className="typeTitle" id="mangaListTitle">
          Reading
        </div>
        <div className="itemContainer">
          <div className="header">
            <div className="title">Title</div>
            <div className="rating">Rating</div>
            <div className="header-status">Status</div>
          </div>
          {manga &&
            manga.map((data, index) => (
              <div key={index} className="item">
                <div className="ImgAndTitle">
                  <div className="Img">
                    <img
                      src={
                        data[0]?.imageUrlLarge ||
                        data[0]?.imageUrl ||
                        data[0]?.imageUrlSmall
                      }
                    ></img>
                  </div>
                  <div className="title">
                    <a target="_blank" href={`/manga/${data[0]?.mal_id}`}>
                      {data[0]?.title}
                    </a>
                  </div>
                </div>
                <div className="rating">{data[1] && data[1]}</div>
                <div className="status">{data[2] && data[2]}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
