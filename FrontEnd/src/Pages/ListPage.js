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
            <div className="score">Score</div>
            <div className="header-counts">Episodes</div>
          </div>
          {anime &&
            anime?.map((data, index) => (
              // <div key={index}>Anime name:{data.data.anime.name}</div>
              <div key={index} className="item">
                <div className="ImgAndTitle">
                  <div className="Img">
                    <img
                      src={
                        data?.data.anime.imageUrlLarge ||
                        data?.data.anime.imageUrl ||
                        data?.data.anime.imageUrlSmall
                      }
                    ></img>
                  </div>
                  <div className="title">
                    <a
                      target="_blank"
                      href={`/anime/${data.data.anime.mal_id}`}
                    >
                      {data.data.anime.name}
                    </a>
                  </div>
                </div>
                <div className="score">{data.data.anime.score || "~"}</div>
                <div className="counts">{data.data.anime.episodes || "~"}</div>
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
            <div className="score">Score</div>
            <div className="header-counts">Chapters</div>
          </div>
          {manga &&
            manga.map((data, index) => (
              <div key={index} className="item">
                <div className="ImgAndTitle">
                  <div className="Img">
                    <img
                      src={
                        data?.data?.manga.imageUrlLarge ||
                        data?.data?.manga.imageUrl ||
                        data?.data?.manga.imageUrlSmall
                      }
                    ></img>
                  </div>
                  <div className="title">
                    <a
                      target="_blank"
                      href={`/manga/${data.data.manga.mal_id}`}
                    >
                      {data.data.manga.title}
                    </a>
                  </div>
                </div>
                <div className="score">{data.data.manga.score || "~"}</div>
                <div className="counts">{data.data.manga.episodes || "~"}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
