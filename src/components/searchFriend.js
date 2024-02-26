import { useEffect,useState,useContext } from "react";
import { getAllUsersFromDatabase,addFriendToUser,getCurrentUserId ,getCurrentUserDatabase} from "../Collections/Users";
import '../styles/SearchFriend.css';
import { AuthContext } from "../Context/AuthContext";
export default function SearchFriend(){
    const [users,setUsers] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState();
    const [searchItem, setSearchItem] = useState('');
    const [userId,setUserId] = useState();
    const {user} = useContext(AuthContext);

    async function getAllUsers(){
        setIsLoading(true);
        return await getAllUsersFromDatabase()
    }

    const handleInputChange = (e) => { 
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)
    
        const filteredItems = users.filter((user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
        setFilteredUsers(filteredItems);
      }

    async function getCurrUser(){
        const id = await getCurrentUserId();
        setUserId(id);
        console.log(`userId: ${userId}`);

    }

    useEffect(()=>{
        getAllUsers().then(data=>{
            console.log(data);
            setUsers(data);
            setFilteredUsers(data);
            setIsLoading(false);
        })
        .catch(e=>{ 
            setIsLoading(false);
            console.log(e)});
    },[])

    useEffect(()=>{
        try{
            getCurrUser();
        }catch(e){
            console.log(e);
        }
    },[user])

    if(isLoading){
        return(<div>Loading ......</div>)
    }
    return (
    <div>
        Search Friend component
        <input onChange={handleInputChange} placeholder="Search Friend"></input>
        <ul className="friends">
            {filteredUsers && filteredUsers.map(
                user => <>{userId != user._id &&
                    <li className="friend" key={user._id} >
                        <div>{user.name}</div>
                        <button onClick={()=>addFriendToUser(user._id)}>Add friend</button>
                    </li>}
                    </>)}
        </ul>
    </div>)
}

