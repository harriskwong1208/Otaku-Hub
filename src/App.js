import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState,useEffect } from 'react';

function App() {

  const [users,setUsers] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  const [error,setError] = useState(null);

  useEffect(()=>{
    const getUsers = async()=>{
      setIsLoading(true)
      try{
        const response = await axios.get('http://localhost:5000/users');
        const data = response.data;
        setUsers(data.users);
        setIsLoading(false);
      }catch(e){
        setError(e);
        setIsLoading(false);
      }      
    }

    getUsers();
  },{});


  if(isLoading){
    return(<div className="App">Loading......</div>)
  }
  if(error){
    console.log(error);
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React !!
        </a>
        
        <div>All users and their emails:</div>
        {users.map((user)=>(
          <div key={user._id}>User: {user.name} email: {user.email}</div>
        ))}
      </header>
    </div>
  );
}

export default App;
