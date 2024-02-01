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
            <div className="anime">
                <div className="anime-details">
                    <div className="title">
                        Bleach
                    </div>
                    <div className="air-date">
                       Air date: 2002=2013
                    </div>
                    <div className="description">
                    Ichigo Kurosaki is an ordinary high schooler—until his family is attacked by a Hollow, a corrupt spirit that seeks to devour human souls. It is then that he meets a Soul Reaper named Rukia Kuchiki, who gets injured while protecting Ichigo's family from the assailant. To save his family, Ichigo accepts Rukia's offer of taking her powers and becomes a Soul Reaper as a result.

                    However, as Rukia is unable to regain her powers, Ichigo is given the daunting task of hunting down the Hollows that plague their town. However, he is not alone in his fight, as he is later joined by his friends—classmates Orihime Inoue, Yasutora Sado, and Uryuu Ishida—who each have their own unique abilities. As Ichigo and his comrades get used to their new duties and support each other on and off the battlefield, the young Soul Reaper soon learns that the Hollows are not the only real threat to the human world. 
              
                    </div>
                </div>
                <div className="anime-pic">
                    <img alt="Bleach" src="https://upload.wikimedia.org/wikipedia/en/7/72/Bleachanime.png"></img>
                </div>
            </div>
        </div>
    
    </div>);

}