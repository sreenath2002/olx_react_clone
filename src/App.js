import React ,{useEffect,useContext}from 'react';
import './App.css';
import Signup from './Pages/Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login  from './Pages/Login'
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import Post from './Strore/PostContext';
import { AuthContext, FirebaseContext } from './Strore/FirebaseContext';
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import firebaseApp from './Firebase/config';
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
const auth = getAuth(firebaseApp);
function App() {
  const{user,setUser}=useContext(AuthContext)
  const {firebase}=useContext(FirebaseContext)
  useEffect(()=>
  { 
    onAuthStateChanged(auth,(user)=>{
      setUser(user)
    })
    
  })
  return (
    <div>
      <Post>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<Create/>} />
          <Route path='/view' element={<View/>} />
        </Routes>
      </Router>
      </Post>
    </div>
  );
}

export default App;

