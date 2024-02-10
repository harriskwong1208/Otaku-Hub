import axios from "axios";
import { apiEndPoints } from "../apiEndpoints";

async function addAnime(anime){

    const {title,mal_id} = anime; 
    const result = await getAnimeByMalId(mal_id);
    if(result){
        alert('Already Added !');
        return;
    }
    try{
        const animeInfo = await axios.post(apiEndPoints.localHost+'anime',{
            "name": title,
            "mal_id": mal_id
        });
        const animeId = animeInfo.data.anime._id;
        console.log(animeId);
    }catch(e){
        console.log(e);
    }

}


async function getAnimeByMalId(mal_id){

    try{
        let anime = await axios.get(apiEndPoints.localHost+'anime');
        anime = anime.data.anime;
        for(let i of anime){
            console.log(i);
            if(i.mal_id == mal_id){

                return true;
            }
        }
    }catch(e){
        console.log(e);
    }
    return false;
}
export {addAnime,getAnimeByMalId};