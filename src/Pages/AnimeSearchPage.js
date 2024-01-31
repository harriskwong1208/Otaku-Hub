import { useEffect,useState } from "react";
import '../styles/AnimeSearchPage.css';


export default function AnimeSearchPage(e){
    const [anime,setAnime] = useState('');
    const [isLoading,setIsLoading] = useState(false);

    function searchAnime(e){
        e.preventDefault();
        console.log('Clicked');
    }


    return(
    <>
        <div className="Search-Container">
            <form  className="search-form" onSubmit={searchAnime}>
                <input className="search-bar" type="text" required placeholder="Enter Anime name here">
                </input>
                <button className="search-btn" type="submit">Search</button>
            </form>
        </div>
        <div className="anime-results">
            <div className="col1">123213</div>
            <div className="col2">abc</div>
        </div>
    
    </>);

}