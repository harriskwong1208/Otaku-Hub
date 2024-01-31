import './App.css';
import HomePage from './Pages/HomePage';
import Navbar from './components/navbar';
import { Route,BrowserRouter,Routes } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import ConfirmSignUp from './Pages/ConfirmSignUp';
import Login from './Pages/LogIn';
import UserProfile from './Pages/UserProfile';
import { AuthProvider } from './Context/AuthContext';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
function App() {

  // const [user,setUser] = useState();

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
              <Route path='/forgot-password' element={<ForgotPassword/>}/>
              <Route path='/reset-password' element={<ResetPassword/>} />
              {/* Now, the UserProfile route is protected by the RouteGuard 
                component. Users who aren't logged in will be redirected to 
                the /login page when trying to access the /profile route. */}
              {/* <Route path="/profile"
              component={ 
                <RouteGuard>
                  <UserProfile />
                </RouteGuard>
              }/> */}
            </Routes>
          </BrowserRouter>
        </div>
    </AuthProvider>
  );
}


export default App;
