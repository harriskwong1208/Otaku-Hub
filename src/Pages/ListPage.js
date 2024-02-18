import axios from "axios";
import { getUserWatchList } from "../Collections/Users";
import { getAnime } from "../Collections/Anime";
import { useEffect,useState,useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
export default function ListPage(){
    
    //After setting anime, to get anime, use anime[index].data.anime
    const [anime,setAnime] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const {user} = useContext(AuthContext);
    async function setAnimeList(animeIdList){
        const animeInfoList = [];
        for(let i of animeIdList){
            animeInfoList.push(await getAnime(i));
        }        
        return animeInfoList;
    }

    async function getList(){
        setIsLoading(true);
        try{
            const animeIdList = await getUserWatchList();
            const animeInfoList = await setAnimeList(animeIdList);
            setAnime(animeInfoList);
            return animeInfoList;

        }catch(e){
            console.log(e);
        }
        
    }


    useEffect(()=>{

            getList().then(data=>{
                        setIsLoading(false);
                    }).catch(e=>{
                        setIsLoading(false);
                    })
        
    },[])

    if(!user){
        return(<div>Sign in to see your list! <a href="/login">Here</a></div>)
    }
    
    if(isLoading){
        return(<>
           Is loading
        </>)
    }

    return(<>
        Anime count: 
        {anime && anime.map((data,index)=> (
            <div key={index}>Anime name:{data.data.anime.name}</div>
        ))}
    </>)

}