import axios from "axios";
import { getUserWatchList, getUserMangaList } from "../Collections/Users";
import { getAnime } from "../Collections/Anime";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { getManga } from "../Collections/Manga";
import LoadComponent from "../components/Loading";
import "../styles/ListPage.css";
export default function ListPage() {
  //After setting anime, to get anime, use anime[index].data.anime
  const [anime, setAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const [manga, setManga] = useState([]);

  async function setMangaList(mangaIdList) {
    const mangaInfoList = [];
    for (let i of mangaIdList) {
      mangaInfoList.push(await getManga(i));
    }
    return mangaInfoList;
  }

  async function setAnimeList(animeIdList) {
    const animeInfoList = [];
    for (let i of animeIdList) {
      animeInfoList.push(await getAnime(i));
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
        console.log(anime);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  }, []);

  if (!user) {
    return (
      <div>
        Sign in to see your list! <a href="/login">Here</a>
      </div>
    );
  }

  if (isLoading) {
    return <LoadComponent />;
  }

  return (
    <div className="ListPage">
      <div id="AnimeList" className="List">
        <div className="Title">Anime List</div>
        <table className="items-container">
          <tr className="tableHeader">
            <th className="title">Title</th>
            <th className="score">Score</th>
            <th className="counts">Episodes</th>
            <th className="type">Type</th>
          </tr>
          {anime &&
          anime.map((data, index) => (
            <div key={index} className="item">
              {/* Anime name:{data.data.anime.name} */}
                <div className="Img">
                  <img src={data.data.anime.imageUrl}></img>
                </div>
                <div className="title">{data.data.anime.name}</div>
                <div className=""></div>
              </div>
          ))}
                    
        </table>
      </div>
      <div id="MangaList" className="List">

      </div>
      {/* Anime watchlist:
      {anime &&
        anime.map((data, index) => (
          <div key={index}>Anime name:{data.data.anime.name}</div>
        ))}
      Manga list:
      {manga &&
        manga.map((data, index) => (
          <div key={index}>Manga name:{data.data.manga.title}</div>
        ))} */}
    </div>
  );
}
