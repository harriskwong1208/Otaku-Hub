import { useContext,useEffect,useState } from "react"
import { AuthContext } from "../Context/AuthContext"
import { getUserIdByEmail,addUserSubId,getUserFromCognito,findEmail } from "../Collections/Users"
import axios from 'axios';
import { getSession,getCurrentUser } from "../auth"
import { apiEndPoints } from "../apiEndpoints";
import { useParams } from "react-router-dom";
export default function UserProfile() {

    const {id} = useParams();
    const [user,setUser] = useState();
    const [isLoading,setIsLoading] = useState(false);

    async function getUser(){
        setIsLoading(true);
        try{
            const data = await axios.get(apiEndPoints.localHost+"users/"+id);
            console.log(data);
            setUser(data.user);
            return data;

        }catch(e){
            console.error(e);
            return new Error(e);
        }   
    }
    useEffect(()=>{
        // getUser().then(data =>{
        //     console.log("AFter:")
        //     console.log(data);
        //     setIsLoading(false);})
        //     .catch(e=> console.log(e));
        setIsLoading(true);
        axios.get(apiEndPoints.localHost+'users/'+id)
            .then(data=> {setUser(data.user); setIsLoading(false);})
            .catch(e=> {console.error(e); setIsLoading(false)});
    },[])

    if(isLoading){
        return(<div>Loading ......</div>)
    }

  return (
    <div>
        Heelo
        {user && <div>{user.name}</div>}
    </div>
  )
}