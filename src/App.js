import './App.css';
import HomePage from './Pages/HomePage';
import Navbar from './components/navbar';
import { Route,BrowserRouter,Routes } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import ConfirmSignUp from './Pages/ConfirmSignUp';
import Login from './Pages/LogIn';
import UserProfile from './Pages/UserProfile';
import { AuthProvider } from './components/AuthContext';
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
            <Route path='/profile' element={< UserProfile/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}


export default App;
