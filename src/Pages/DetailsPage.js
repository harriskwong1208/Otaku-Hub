import { useParams } from "react-router-dom";
import { useState,useEffect,useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { apiEndPoints } from "../apiEndpoints";

export default function DetailsPage(){
    const {id} = useParams();
    const {user} = useContext(AuthContext);
    const [isLoading,setIsLoading] = useState(false);
    const [anime,setAnime] = useState({});
    const [error,setError] = useState(null);
    async function getAnime(){
        setIsLoading(true);
        try{
            let _anime = await axios.get(apiEndPoints.jikanById+id);
            _anime = _anime.data.data;
            setAnime(_anime);
            console.log(_anime);
            setIsLoading(false);
        }catch(e){
            setError(e);
            console.log(e);
            setIsLoading(false);
        }
    }
    
    useEffect(()=>{
        getAnime();
    },[]);


    return(<>
        {id && id}
    </>)
}