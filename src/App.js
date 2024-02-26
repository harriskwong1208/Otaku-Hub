import './App.css';
import HomePage from './Pages/HomePage';
import Navbar from './components/navbar';
import { Route,BrowserRouter,Routes } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import ConfirmSignUp from './Pages/ConfirmSignUp';
import Login from './Pages/LogIn';
import Profile from './Pages/Profile';
import { AuthProvider } from './Context/AuthContext';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import AnimeSearchPage from './Pages/AnimeSearchPage';
import DetailsPage from './Pages/DetailsPage';
import ListPage from './Pages/ListPage';
import FriendPage from './Pages/FriendPage';
import UserProfile from './Pages/UserProfile';
function App() {


  return (
    <AuthProvider>
      <div className='app'>
          <Navbar/>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<HomePage/>}/>
              <Route path='/signup' element={<SignUp/>}/>
              <Route path='/confirm-sign-up' element={<ConfirmSignUp/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/profile' element={< Profile/>}/>
              <Route path='/forgot-password' element={<ForgotPassword/>}/>
              <Route path='/reset-password' element={<ResetPassword/>} />
              <Route path='/animesearch' element={<AnimeSearchPage/>}/>
              <Route path='/anime/:id' element={<DetailsPage/>} />
              <Route path='/list' element={<ListPage/>} />
              <Route path='/friends' element={<FriendPage/>}/>
              <Route path='/user/:id' element={<UserProfile/>}/>

            </Routes>
          </BrowserRouter>
        </div>
    </AuthProvider>
  );
}


export default App;
