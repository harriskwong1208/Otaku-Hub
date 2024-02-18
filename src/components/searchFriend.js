import { useEffect,useState,useContext } from "react";
import { getAllUsersFromDatabase } from "../Collections/Users";



export default function SearchFriend(){
    const [users,setUsers] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState();
    const [searchItem, setSearchItem] = useState('')

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

    if(isLoading){
        return(<div>Loading ......</div>)
    }
    return (
    <div>
        Search Friend component
        <input onChange={handleInputChange} placeholder="Search Friend"></input>
        <ul>
            {filteredUsers &&  filteredUsers.map(user => <li key={user._id}>{user.name}</li>)}

        </ul>
    </div>)
}

