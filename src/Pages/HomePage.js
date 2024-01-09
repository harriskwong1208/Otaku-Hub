import '../styles/HomePage.css';
import { useEffect ,useState } from 'react';
import HomeAnimeDisplay from '../components/HomeAnimeDisplay';

function HomePage(){
    const [animeSearch,setAnimeSearch] = useState('');
    const [animeList,setAnimeList] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error,setError] = useState(null);


   async function getAnime(){
        setIsLoading(true);
        try{
            
            const response = await fetch(`https://api.jikan.moe/v4/anime?q=${animeSearch}&sfw`);
            const data = await response.json();
            setAnimeList(data);
            setIsLoading(false);
            console.log(data);
        }catch(e){
            setIsLoading(false);
            setError(e);
            console.log(e);
        }

   }


    return(
        <div className='homepage'>
            <input placeholder='Enter anime name' id='animesearch' onChange={e=>setAnimeSearch(e.target.value)}></input>
            <button id='animesearch-btn'> submit</button>
            {/* <div id='animeDisplay'>{animeSearch}</div> */}
            <HomeAnimeDisplay animeSearch={animeSearch}/>
        </div>
    )
}

export default HomePage;