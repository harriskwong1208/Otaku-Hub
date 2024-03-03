import { useContext,useEffect,useState } from "react"
import { AuthContext } from "../Context/AuthContext"
import { getUserIdByEmail,addUserSubId,getUserFromCognito,findEmail } from "../Collections/Users"
import axios from 'axios';
import { getSession,getCurrentUser } from "../auth"
import { apiEndPoints } from "../apiEndpoints";
import { useParams } from "react-router-dom";
import { getAnime } from "../Collections/Anime";
import { getManga } from "../Collections/Manga";
export default function UserProfile() {

    const {id} = useParams();
    const [user,setUser] = useState();
    const [isLoading,setIsLoading] = useState(false);
    const [watchList, setWatchList] = useState();
    const [mangaList, setMangaList] = useState();
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

    async function setList(List,callback,type){
        let list = [];
        for(let i of  List){
            const response = await callback(i);
            const data = response.data[type];
            list.push(data);
        }
        return list;
    }

    async function setAllLists(){
        let data = await axios.get(apiEndPoints.localHost+'users/'+id);
        const userinfo = data;
        setUser(data.data.user);

        data =  await setList(data.data.user.watchList,getAnime,"anime");
        console.log('WatchList:');
        console.log(data);
        setWatchList(data);

        data = await setList(userinfo.data.user.mangaList,getManga,"manga");
        console.log('MangaList:');
        console.log(data);
        setMangaList(data);
     
    }


    useEffect(()=>{
        setIsLoading(true);
        setAllLists()
            .then(()=>{
                setIsLoading(false);
            }).catch(e=>{
                console.error(e);
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
        {mangaList && 
        <ul>
            {mangaList.map((manga,index)=>(
            <li key={index}>
                <a href={`/manga/${manga.mal_id}`} target="_blank">{manga.title}</a>
            </li>))}
        </ul>}


    </div>
  )
}