import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState,useEffect } from 'react';
import HomePage from './components/HomePage';
import Navbar from './components/navbar';
function App() {

  //Mock prop to to pass to HomePage component for unit testing
  const homeitems = [
    {id: 1, title:"One Piece", completed: false},
    {id: 2, title:"Bleach", completed: false},
    {id: 3, title:"Naruto", completed: true}
  ];


  return (

    <>
      {/* <Navbar/> */}
      {homeitems.map((item,index)=>{
        return(<HomePage key={index} item={item}/>)
      })}
    </>


  );
}

export default App;
