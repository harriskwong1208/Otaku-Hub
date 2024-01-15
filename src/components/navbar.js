import '../styles/navbar.css';
import logo from '../static/sitelogo.jpg';
import { Link } from 'react-router-dom';
import SignUp from '../Pages/SignUp';
import Login from '../Pages/LogIn';
export default function Navbar() {
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
        <div className='login'>
          <a href='/login'>Login</a>
        </div>
        <div className='logout'>
          <a href='/'>Log out</a>
        </div>
        <div className='signup'>
          <a href='/signup'>Sign Up</a>
        </div>

      </div>
    </div>
  );
}