import '../styles/HomePage.css';
import { useEffect ,useState } from 'react';
import HomeAnimeDisplay from '../components/HomeAnimeDisplay';
import HomeDefaultDisplay from '../components/HomeDefaultDisplay';
function HomePage(){
    const [animeSearch,setAnimeSearch] = useState('');
    const [animeList,setAnimeList] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error,setError] = useState(null);

    useEffect(()=>{
        document.title = 'OtakuHub|Home'
    },[])

   async function getAnime(){
        if(animeSearch.length != 0){
            setIsLoading(true);            
            try{
                const response = await fetch(`https://api.jikan.moe/v4/anime?q=${animeSearch}&sfw&limit=15`);
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
   }



    return(
        <div className='homepage'>
            <input placeholder='Enter anime name' id='animesearch'  onChange={e=>setAnimeSearch(e.target.value)}></input>
            <button id='animesearch-btn' onClick={()=> getAnime()}> submit</button>
            <HomeAnimeDisplay animeList={animeList}/>
        </div>
    )
}

export default HomePage;