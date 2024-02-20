import { getFriendsFromUser } from "../Collections/Users";
import axios from "axios";
import {useState,useEffect,useContext} from 'react';

export default function ListFriends(){

    const [friends,setFriends] = useState();
    const [isLoading,setIsLoading] = useState(false);

    useEffect(()=>{
        getFriendsFromUser()
            .then(data=> setFriends(data))
            .catch(e=>console.log(e));
    },[])

    if(isLoading){
        return(<div>Loading......</div>)
    }
    
    return(<div>
        <ul>
            {friends && friends.map((friend,index)=>(
                <li key={index}>
                    friend: {index}
                </li>))}
        </ul>
    </div>);
}