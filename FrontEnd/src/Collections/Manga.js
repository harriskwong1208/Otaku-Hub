import axios from "axios";
import { apiEndPoints } from "../apiEndpoints";
import {
  getCurrentUserId,
  checkUserWatchList,
  checkUserMangaList,
} from "./Users";

async function addManga(manga) {
  const {
    title,
    mal_id,
    images,
    published,
    demographics,
    serializations,
    chapters,
    type,
    url,
    score,
  } = manga;

  let _published;
  _published = `${published.from.split("T")[0]} ${
    published.to && published.to.split("T")[0]
  }`;

  let _demographic = null;
  if (demographics.length > 0) {
    _demographic = demographics[0].name;
  }

  let _serializations = [];
  if (serializations.length > 0 && serializations[0].name) {
    _serializations.push(serializations[0].name);
  }

  try {
    //Check if manga is already added into watch list
    //returns manga if found
    const result = await getMangaByMalId(mal_id);
    let mangaId;

    if (result === null) {
      //add manga to animes collection
      const mangaInfo = await axios.post(apiEndPoints.backEndApi + "manga", {
        title: title,
        mal_id: mal_id,
        imageUrl: images?.jpg.image_url,
        published: _published,
        demographic: _demographic,
        serializations: _serializations,
        chapters: chapters,
        type: type,
        malLink: url,
        score: score,
      });

      mangaId = mangaInfo.data.manga._id;
    } else {
      mangaId = result._id;
    }
    const userId = await getCurrentUserId();
    const found = await checkUserMangaList(userId, mangaId);
    if (found) {
      alert("Already in manga List !!!");
    } else {
      //add mangaId to user manga List
      const message = await axios.put(
        apiEndPoints.backEndApi + "users/" + userId,
        {
          mangaItem: [mangaId, 0, "Reading"],
        }
      );
      alert("Added to Manga List!");
      console.log(message);
    }
  } catch (e) {
    console.log(e);
  }
}

//Check if manga exists in data
//Returns the manga object if found
async function getMangaByMalId(mal_id) {
  try {
    let manga = await axios.get(apiEndPoints.backEndApi + "manga");
    manga = manga.data.manga;
    for (let i of manga) {
      if (i.mal_id == mal_id) {
        console.log(i);
        return i;
      }
    }
  } catch (e) {
    console.log(e);
  }
  return null;
}

async function getManga(id) {
  let manga;
  try {
    manga = await axios.get(apiEndPoints.backEndApi + `manga/${id}`);
  } catch (e) {
    return new Error("Error in getting manga.");
  }
  return manga;
}

export { addManga, getMangaByMalId, getManga };
