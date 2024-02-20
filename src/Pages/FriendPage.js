import SearchFriend from "../components/searchFriend"
import ListFriends from "../components/listFriends"
import { useEffect, useState } from "react"

export default function FriendPage(){
    const [component,setComponent] = useState('');

    return (
    <div>
        Friends Page 
        <button onClick={()=>setComponent("friends")}>Show List of Friends</button>
        <button onClick={()=>setComponent("search")}>Search for users </button>
        {(component == "search" || component == '') && <SearchFriend/>}
        {component == "friends" && <ListFriends/>}
    </div>)
}