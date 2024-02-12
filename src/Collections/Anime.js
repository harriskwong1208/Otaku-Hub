import axios from "axios";
import { apiEndPoints } from "../apiEndpoints";
import { getCurrentUserId,checkUserWatchList } from "./Users";

async function addAnime(userId,anime){

    const {title,mal_id} = anime; 


    try{
        //Check if anime is already added into watch list
        //returns anime if found
        const result = await getAnimeByMalId(mal_id);
        let animeId;
        if(result == null){
            //add anime to animes collection
            const animeInfo = await axios.post(apiEndPoints.localHost+'anime',{
                "name": title,
                "mal_id": mal_id
            });
            animeId = animeInfo.data.anime._id;
        }else{
            animeId = result._id;
        }
        const found = await checkUserWatchList(userId,animeId);
        if(found){
            alert("Already in watch List !!!")
        }else{
            //add animeId to user watch List
            const message = await axios.put(apiEndPoints.localHost+'anime/'+userId,{
                "animeId": animeId
            });
            console.log("Added to watch List!");
            console.log(message);
        }
    }catch(e){
        console.log(e);
    }

}

//Check if anime exists in data
//Returns the anime object if found
async function getAnimeByMalId(mal_id){

    try{
        let anime = await axios.get(apiEndPoints.localHost+'anime');
        anime = anime.data.anime;
        for(let i of anime){
            if(i.mal_id == mal_id){
                console.log(i);
                return i;
            }
        }
    }catch(e){
        console.log(e);
    }
    console.log(`anime with mal_id:${mal_id} cannot be found in database`);
    return null;
}



export {addAnime,getAnimeByMalId};