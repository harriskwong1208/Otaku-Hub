import SearchFriend from "../components/searchFriend"
import ListFriends from "../components/listFriends"
import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../Context/AuthContext";
import Login from "./LogIn";
export default function FriendPage(){
    const [component,setComponent] = useState('');
    const {user} = useContext(AuthContext);
    if(user == null){
        return <Login/>
    }
    return (
    <div>
        Friends Page 
        <button onClick={()=>setComponent("friends")}>Show List of Friends</button>
        <button onClick={()=>setComponent("search")}>Search for users </button>
        {(component == "search" || component == '') && <SearchFriend/>}
        {component == "friends" && <ListFriends/>}
    </div>)
}