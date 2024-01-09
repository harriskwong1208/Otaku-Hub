import './App.css';
// import axios from 'axios';
// import { useState,useEffect } from 'react';
import HomePage from './Pages/HomePage';
import Navbar from './components/navbar';
import { Route,BrowserRouter,Routes } from 'react-router-dom';
function App() {



  return (

    <div className='app'>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
