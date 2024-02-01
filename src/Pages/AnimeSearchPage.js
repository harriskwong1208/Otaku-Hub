import { useEffect,useState } from "react";
import '../styles/AnimeSearchPage.css';
import axios from "axios";
import { apiEndPoints } from "../apiEndpoints";



export default function AnimeSearchPage(e){
    const [anime,setAnime] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const [results,setResults] = useState([]);

    useEffect(()=>{
        console.log(results);
    },[results]);



    async function searchAnime(e){
        e.preventDefault();
        setIsLoading(true);
        try{
            const data = await axios.get(apiEndPoints.jikan+anime+'&sfw&limit=16');
            setResults(data.data.data);
            setIsLoading(false);      
        }catch(e){
            console.log(e);
            setIsLoading(false);
        }
    }

    if(isLoading){
        return(
        <>
            Loading Results......
        </>)
    }


    return(
    <div className="animesearch-page">
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>            
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>        
        </head>
        <div className="Search-Container">
            <form  className="search-form" onSubmit={searchAnime}>
                <input className="search-bar" type="text" 
                    required placeholder="Enter Anime name here" 
                    onChange={e=>setAnime(e.target.value) }
                />
                <button className="search-btn" type="submit">Search</button>
            </form>
        </div>
        <div className="anime-results">
            {results.map((anime)=>(
                <div key={anime.mal_id} className="anime">
                    <div className="anime-details">
                        <div className="title">
                            {anime.title}
                        </div>
                        <div className="score">
                            Score: {anime.score}
                        </div>
                        <div className="synopsis">
                            {anime.synopsis}
                        </div>
                    </div>
                    <div className="anime-pic">
                        <img alt="anime-image" src={anime.images.jpg.image_url}></img>
                    </div>
                </div>
            ))}

        </div>
    
    </div>);

}