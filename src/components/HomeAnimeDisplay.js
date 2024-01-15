import HomeDefaultDisplay from "./HomeDefaultDisplay";
const HomeAnimeDisplay=({animeList})=>{
    
    if(Object.keys(animeList).length === 0 ){
        return <HomeDefaultDisplay/>
    }
    

    return(
        <ul className="animeRows">
            {animeList.data.map((anime)=>(
                <li key={anime.mal_id}>{anime.title}
                    <img  className='animePic' src={anime.images.jpg.image_url}/>
                </li>
            ))}
        </ul>
    )
}

export default HomeAnimeDisplay;