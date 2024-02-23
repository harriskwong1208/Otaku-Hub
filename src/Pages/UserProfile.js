import { useContext,useEffect,useState } from "react"
import { AuthContext } from "../Context/AuthContext"
import { getUserIdByEmail,addUserSubId,getUserFromCognito,findEmail } from "../Collections/Users"
import axios from 'axios';
import { getSession,getCurrentUser } from "../auth"
import { apiEndPoints } from "../apiEndpoints";
import { useParams } from "react-router-dom";
import { getAnime } from "../Collections/Anime";
export default function UserProfile() {

    const {id} = useParams();
    const [user,setUser] = useState();
    const [isLoading,setIsLoading] = useState(false);
    const [watchList, setWatchList] = useState();

    async function getUserName(id){
        try{
            const user = await axios.get(apiEndPoints.localHost+'users/'+id);
            const name = user.data.user.name;
            return name;
        }catch(e){
            console.log(e);
            return "Error loading name...";
        }
    }
    async function setAnimeWatchList(watchList){
        let list = [];
        for(let i of  watchList){
            const response = await getAnime(i);
            const data = response.data.anime;
            list.push(data);
        }
        return list;
    }


    useEffect(()=>{
        setIsLoading(true);
        axios.get(apiEndPoints.localHost+'users/'+id)
            .then(data=>{
                setUser(data.data.user);
                // console.log(data.data.user.watchList);
                setAnimeWatchList(data.data.user.watchList)
                    .then(data => {
                        console.log(data);
                        setWatchList(data);
                        setIsLoading(false);
                    })
                    .catch(e=>{
                        console.log(e);
                        setIsLoading(false);
                    })
            })
            .catch(e => {
                console.log(e);
                setIsLoading(false);
            })
    },[])

    if(isLoading){
        return(<div>Loading ......</div>)
    }

  return (
    <div>
        
        Name: {user && <div>{user.name}</div>}
        Friends: {user && 
            <ul>
                {user.friends.map((friend,index)=>(
                <li key={index}>
                    {/* {getUserName(friend)} */}
                    friend
                </li>))}
            </ul>}
        Watch List: {watchList && 
        <ul>
            {watchList.map((anime,index)=>(
            <li key={index}>
                <a href={`/anime/${anime.mal_id}`} target="_blank">{anime.name}</a>
            </li>))}
        </ul>}
        Manga List: 
        {/* TO BE IMPLEMENETED  */}



    </div>
  )
}