import './App.css';
import HomePage from './Pages/HomePage';
import Navbar from './components/navbar';
import { Route,BrowserRouter,Routes } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import ConfirmSignUp from './Pages/ConfirmSignUp';
import Login from './Pages/LogIn';
import UserProfile from './Pages/UserProfile';
import { AuthProvider } from './components/AuthContext';
import RouteGuard from './components/RouteGuard';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import { LoginContext } from './Context/LoginContext';
import {useState} from 'react';
function App() {

  const [user,setUser] = useState();

  return (
    // <AuthProvider>
    <LoginContext.Provider value={{user,setUser}}>
      <div className='app'>
          <Navbar/>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<HomePage/>}/>
              <Route path='/signup' element={<SignUp/>}/>
              <Route path='/confirm-sign-up' element={<ConfirmSignUp/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/profile' element={< UserProfile/>}/>
              <Route path='/forgot-password' element={<ForgotPassword/>}/>
              <Route path='reset-password' element={<ResetPassword/>} />
              {/* Now, the UserProfile route is protected by the RouteGuard 
                component. Users who aren't logged in will be redirected to 
                the /login page when trying to access the /profile route. */}
              <Route path="/profile"
              component={
                <RouteGuard>
                  <UserProfile />
                </RouteGuard>
              }/>
            </Routes>
          </BrowserRouter>
        </div>
    </LoginContext.Provider> 

    //</AuthProvider>
  );
}


export default App;
