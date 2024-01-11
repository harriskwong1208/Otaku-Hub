import './App.css';
import HomePage from './Pages/HomePage';
import Navbar from './components/navbar';
import { Route,BrowserRouter,Routes } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import ConfirmSignUp from './Pages/ConfirmSignUp';

function App() {



  return (

    <div className='app'>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/confirm-sign-up' element={<ConfirmSignUp/>}/>

        </Routes>
      </BrowserRouter>
    </div>

  );
}


export default App;
