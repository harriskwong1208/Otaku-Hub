import { useParams } from "react-router-dom";
import { useState,useEffect,useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { apiEndPoints } from "../apiEndpoints";
import '../styles/DetailsPage.css';

export default function DetailsPage(){
    const {id} = useParams();
    const {user} = useContext(AuthContext);
    const [isLoading,setIsLoading] = useState(false);
    const [anime,setAnime] = useState({});
    const [error,setError] = useState(null);
    
    async function getAnime(){
        setIsLoading(true);
        try{
            let _anime = await axios.get(apiEndPoints.jikanById+id);
            _anime = _anime.data.data;
            setAnime(_anime);
            console.log(_anime);
            setIsLoading(false);
        }catch(e){
            setError(e);
            console.log(e);
            setIsLoading(false);
        }
    }
    
    useEffect(()=>{
        getAnime();
    },[]);

    if(isLoading){
        return(<div>Loading......</div>)
    }

    return(<div className="DetailsPage">

        <div className="left-section">
            <div className="img">
                <img src={anime && anime.images.jpg.large_image_url}/>
            </div>
            <div className="information">
                <div className="airDate">
                    Air Date: {anime.aired.string && anime.aired.string}
                </div>
                <div className="demographic">
                    Demographic: {anime.demographics[0].name && anime.demographics[0].name}
                </div>
                <div className="duration">
                    Duration: {anime.duration}
                </div>
                <div className="studio">
                    Studios: 
                    {anime.studios.map((studio,index)=>(
                    index != anime.studios.length-1 ?
                    ` ${studio.name},` : ` ${studio.name}`
                    ))}
                </div>
                <div className="episodes">
                    Episodes: {anime.episodes ? anime.episodes : "Still airing"}
                </div>
                <div className="rating">
                    Rating: {anime.rating}
                </div>
                <div className="season">
                    Season Aired: {anime.season}
                </div>                 
                <div className="source">
                    Source Material: {anime.source}
                </div>
                <div className="producers">
                    Producers: 
                        {anime.producers.map((producer,index)=>(
                            index != anime.producers.length-1 ?
                            ` ${producer.name},` : ` ${producer.name}`
                        ))}
                </div>
                <div className="mal-link">
                    More Details: <a target="_blank" href={anime.url}>MyAnimeList</a>
                </div>
            </div>

        </div>
        <div className="right-section">
            <div className="top-section">
                <div className="score">
                    Score: {anime.score}, by {anime.scored_by} users
                </div>
                <div className="popularity">
                    Popularity: {anime.popularity}
                </div>
                <div className="rank">
                    Ranking: {anime.rank}
                </div>
                <div className="popularity">
                    Popularity: {anime.popularity}
                </div>
                <div className="List-setting">
                    {!user ? <div>Sign in to add to list!</div> :
                     <button onClick={()=>console.log('Clicked')}>Add to List</button>}
                </div>
            </div>
            <div className="middle-section">
                <div className="description">
                            
                </div>
            </div>
        </div>
       <div className="popup">
        Popup
       </div>
    </div>)
}