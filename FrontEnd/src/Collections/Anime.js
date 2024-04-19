import axios from "axios";
import { apiEndPoints } from "../apiEndpoints";
import { getCurrentUserId, checkUserWatchList } from "./Users";

async function addAnime(anime) {
  const {
    title,
    mal_id,
    images = null,
    aired = null,
    demographics,
    studios = null,
    episodes,
    source,
    url,
    score,
  } = anime;
  let _studios;
  studios
    ? (_studios = studios.map((studio) => {
        return studio.name;
      }))
    : (_studios = null);
  let _demographics;
  demographics.length > 0
    ? (_demographics = demographics[0].name)
    : (_demographics = null);
  try {
    //Check if anime is already added into watch list
    //returns anime if found
    const result = await getAnimeByMalId(mal_id);
    let animeId;
    if (result === null) {
      //add anime to animes collection
      const animeInfo = await axios.post(apiEndPoints.backEndApi + "anime", {
        name: title,
        mal_id: mal_id,
        imageUrl: images?.jpg.image_url,
        aired: aired.string,
        demographic: _demographics,
        studio: _studios,
        episodes: episodes,
        source: source,
        malLink: url,
        score: score,
        imageUrlLarge: images?.jpg.large_image_url,
        imageUrlSmall: images?.jpg.small_image_url,
      });
      animeId = animeInfo.data.anime._id;
    } else {
      animeId = result._id;
    }
    const userId = await getCurrentUserId();
    const found = await checkUserWatchList(userId, animeId);
    if (found) {
      alert("Already in watch List !!!");
    } else {
      //add animeId to user watch List
      const message = await axios.put(
        apiEndPoints.backEndApi + "users/" + userId,
        {
          animeId: animeId,
        }
      );
      console.log("Added to watch List!");
      console.log(message);
    }
  } catch (e) {
    console.log(e);
  }
}

//Check if anime exists in data
//Returns the anime object if found
async function getAnimeByMalId(mal_id) {
  try {
    let anime = await axios.get(apiEndPoints.backEndApi + "anime");
    anime = anime.data.anime;
    for (let i of anime) {
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

async function getAnime(id) {
  let anime;
  try {
    anime = await axios.get(apiEndPoints.backEndApi + `anime/${id}`);
  } catch (e) {
    return new Error("Error in getting anime.");
  }
  return anime;
}

export { addAnime, getAnimeByMalId, getAnime };
