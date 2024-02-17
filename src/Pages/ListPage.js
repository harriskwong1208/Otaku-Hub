import axios from "axios";
import { getUserList } from "../Collections/Users";
import { useEffect,useState } from "react";
export default function ListPage(){
    
    const [list,setList] = useState({});
    const [isLoading,setIsLoading] = useState(false);
    useEffect(()=>{
        setIsLoading(true);
        getUserList()
        .then(data=>console.log(data))
        .catch(e=>console.log(e));

    },[])
    
    return(<>
        List
    </>);
}