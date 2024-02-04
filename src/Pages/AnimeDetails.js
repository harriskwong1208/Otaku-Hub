import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";

export default function AnimeDetails(){
    const {id} = useParams();
    return(<>
        {id && id}
    </>)
}