import '../styles/navbar.css';
import logo from '../static/sitelogo.jpg';
import {useContext} from 'react';
import { LoginContext } from '../Context/LoginContext';
import { signOut } from '../auth';
export default function Navbar() {

  const {user,setUser} = useContext(LoginContext);
  
  const handleLogout= async()=>{
    try{
      await signOut();
      setUser(null);
    }catch(e){
      console.log(e);
    }
  }


  return (
    <div className='navbar'>
      <div className='logo-sitename'>
        <img className='logo' src={logo} onClick={()=>console.log('clicked')}/>
        <div className='sitename'>OtakuHub</div>
      </div>
      <div className='tabs'>
        <div className='home'><a href='/'>Home</a></div>
        <div className='anime'>Anime</div>
        <div className='manga'>Manga</div>
        <div className='friends'>Friends</div>
        <div className='list'>List</div>
      </div>
      <div className='login-out'>
        {!user && 
          <div className='login'>
            <a href='/login'>Login</a>
          </div>        
        }

        {user &&
        <div className='logout' onClick={() => handleLogout()}> 
          Log out
        </div>
        }
        {!user  &&
          <div className='signup'>
            <a href='/signup'>Sign Up</a>
          </div>
        }
      </div>
    </div>
  );
}